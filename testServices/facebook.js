const env = require("../src/config/env_variables").getEnv();
const uuid = require("uuid/v4");

exports.request = (producer, data) => {
    const { correlationId, ...reqData } = data;
    producer.assertQueue(env.rabbitmq.queue.req.authFacebook, { durable: true });
    producer.sendToQueue(env.rabbitmq.queue.req.authFacebook, Buffer.from(JSON.stringify(reqData)), { correlationId });
};

exports.response = (consumer, id, callback) => {
    // ch.assertExchange(ex, 'fanout', {durable: false});    
    // ch.assertQueue('', {exclusive: true}, function(err, q) {
    //   console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
    //   ch.bindQueue(q.queue, ex, '');

    //   ch.consume(q.queue, function(msg) {
    //     if(msg.content) {
    //     console.log(" [x] %s", msg.content.toString());
    // }
    //   }, {noAck: true});
    // });
    consumer.assertQueue(env.rabbitmq.queue.res.authFacebook, { durable: true });
    consumer.consume(env.rabbitmq.queue.res.authFacebook, function(msg){
        consumer.ack(msg);
        callback(msg);
    }, {
        consumerTag: uuid()
    });
};