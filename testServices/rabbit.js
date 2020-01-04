const amqp = require("amqplib");
// const env = require("../src/config/env_variables").getEnv();
const uuid = require("uuid/v4");

(async () => {
    const conn = await amqp.connect("amqp://localhost");
    const channel_producer = await conn.createChannel();
    const channel_consumer = await conn.createChannel();

    const Exchange = {
        FACEBOOK: "FACEBOOK"
    };

    const QUEUE = { REQ: "REQ", RES: "RES" };

    const publish = () => {
        const correlationId = uuid();
        channel_producer.assertExchange(Exchange.FACEBOOK, "fanout", { durable: false });
        channel_producer.publish(Exchange.FACEBOOK, "", Buffer.from("Hello World!"), { correlationId });
        return correlationId;
    };

    const subscribe = async (correlationId, callback) => {
        channel_consumer.assertExchange(Exchange.FACEBOOK, 'fanout', { durable: false });
        channel_consumer.assertQueue("", { exclusive: true }, (err, queue) => {
            console.log(err);
            channel_consumer.bindQueue(queue.queue, Exchange.FACEBOOK, "");
            channel_consumer.consume(queue.queue, (msg) => {
                console.log(`Consumer Message: ${msg.content.toString()}`);
                console.log(`Consumer correlationId: ${msg.properties.correlationId}`);
                console.log(`Requested correlationId: ${correlationId}`);
            }, { noAck: true });
        });        
    };

    const corr1 = publish();
    const corr2 = publish();
    console.log(corr1, corr2);
    subscribe(corr1, null);
    subscribe(corr2, null);

})();

// class RabbitMQ {

//     constructor(serverUrl) {        
//         this.amqpServer = serverUrl;
//         this.producer = null;
//         this.consumer = null;
//     }

//     updateClients(producer, consumer) {
//         this.producer = producer;
//         this.consumer = consumer;
//     }

//     async config() {
//         return new Promise((resolve, reject) => {
//             amqp.connect(this.amqpServer, (err, conn) => {
//                 if (err) {
//                     reject(err);
//                 }
//                 else {                    
//                     const producer = new Promise((resolve1, reject1) => {                        
//                         conn.createChannel((err1, producerChannel) => {                            
//                             if (err1) {
//                                 reject1(err1);
//                             }
//                             else {
//                                 resolve1(producerChannel);
//                             }
//                         });
//                     });

//                     const consumer = new Promise((resolve2, reject2) => {
//                         conn.createChannel((err2, consumerChannel) => {
//                             if (err2) {
//                                 reject2(err2);
//                             }
//                             else {
//                                 resolve2(consumerChannel);
//                             }
//                         });
//                     });      
//                     Promise.all([producer, consumer])
//                         .then((channels) => {
//                             this.updateClients(channels[0], channels[1]);
//                             resolve(true);
//                         })  
//                         .catch(reject);            
//                 }
//             });
//         });
//     }
// }

// module.exports = new RabbitMQ(env.rabbitmq.server);