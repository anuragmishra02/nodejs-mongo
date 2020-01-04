const rabbitMQ = require("../utils/RabbitMQ");
const logger = require("./logger");
const chalk = require("chalk").default;

const log = message => logger.info(chalk.yellow(message));

module.exports = async (requestName, requestQueue, responseQueue, data, correlationId, requestId,exchange) => {    

    const [consumer, producer] = [rabbitMQ.getConsumer(), rabbitMQ.getProducer()];    
    const _data = typeof data === "object" ? JSON.stringify(data) : data;

    log(`request ${requestId} calls ${requestName}`)

    log(`${requestId} RabbitMQ requests ${requestName} with correlationId(${correlationId})`); 
    log(`${requestId} RabbitMQ requests ${requestName} with exchange(${exchange})`); 

    producer.assertExchange(exchange,"topic",{durable:true});   
    producer.assertQueue(requestQueue);
    producer.sendToQueue(requestQueue, Buffer.from(_data), { correlationId });

    return new Promise((resolve, reject) => {
        consumer.assertExchange(exchange,"topic",{durable:true});
        consumer.assertQueue(responseQueue);
        consumer.consume(responseQueue, (msg) => {
            consumer.ack(msg);
            consumer.cancel(msg.fields.consumerTag);
            log(`${requestId} RabbitMQ received response from ${requestName}`);
            log(`${requestId} comparing correlationId from rabbitmq ${msg.properties.correlationId} with requests correlationId ${correlationId}`);
            //if(msg.properties.correlationId === correlationId){  
                const _msg = JSON.parse(msg.content.toString());
                console.log(_msg);
                if(_msg.data){
                    console.log("msg.data true  >>> ");
                    resolve([_msg.data,msg.properties.correlationId]);
                }
                else if(_msg.error){
                    console.log("msg.error true  >>> ");
                    reject([_msg.error,msg.properties.correlationId]);
                }
            //}
        });
    });    
};