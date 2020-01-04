const RabbitMQ = require("../utils/RabbitMQ");
const logger = require("../config/logger");
const env = require("../config/env_variables").getEnv();
const chalk = require("chalk").default;
const events = require("events").EventEmitter;
const e = new events();

class AMQPRegisterServices {

    _auth_facebook(cb){
        e.addListener("result", cb);
        
    }

    createAccount(message, callback) {
        // const { correlationId, ...data } = message;

        // const queueName_req = env.rabbitmq.queue.req.accountCreation;
        // const queueName_res = env.rabbitmq.queue.res.accountCreation;

        // this.producer.assertQueue(queueName_req, { durable: true });
        // this.producer.sendToQueue(queueName_req, Buffer.from(JSON.stringify(data)), { correlationId });

        // this.consumer.assertQueue(queueName_res, { durable: true });
        // this.consumer.consume(queueName_res, (msg) => {
        //     this.consumer.ack(msg);
        //     if (msg.properties.correlationId === correlationId) {
        //         const response = JSON.parse(msg.content.toString());
        //         if (response.error) {
        //             callback(response.error);
        //         }
        //         else {
        //             callback(null, response.data);
        //         }
        //     }
        // });

    }

    // transfer Free Token to User Account
    sendFreeToken(message, callback) {
        // const { correlationId, ...data } = message;

        // const queueName_req = env.rabbitmq.queue.req.freeTokens;
        // const queueName_res = env.rabbitmq.queue.res.freeTokens;

        // this.producer.assertQueue(queueName_req, { durable: true });
        // this.producer.sendToQueue(queueName_req, Buffer.from(JSON.stringify(message)), { correlationId });


        // this.consumer.assertQueue(queueName_res, { durable: true });
        // this.consumer.consume(queueName_res, (msg) => {
        //     this.consumer.ack(msg);
        //     if (msg.properties.correlationId === correlationId) {
        //         const response = JSON.parse(msg.content.toString());
        //         if (response.error) {
        //             callback(response.error);
        //         }
        //         else {
        //             callback(null, response.data);
        //         }
        //     }
        // });

    }

    //Add and consume userdata to FBGraph queue    
    auth_facebook_req(message, callback) {
        // const { correlationId, ...data } = message;
        // const queueName_req = env.rabbitmq.queue.req.authFacebook;
        // // const queueName_res = env.rabbitmq.queue.res.authFacebook;

        // this.producer.assertQueue(queueName_req, { durable: true });
        // this.producer.sendToQueue(queueName_req, Buffer.from(JSON.stringify(data)), { correlationId });
        // // console.log(chalk.yellow(JSON.stringify(message)));
        // // this.consumer.assertQueue(queueName_res, { durable: true });
        // // this.consumer.consume(queueName_res, (msg) => {
        // //     this.consumer.ack(msg);
        // console.log(chalk.yellow("request"));
        //     console.log(chalk.yellow(correlationId));            
        // //     console.log(chalk.yellow(msg.properties.correlationId === correlationId));
        // //     if (msg.properties.correlationId === correlationId) {
        // //         const response = JSON.parse(msg.content.toString());
        // //         logger.info(`${correlationId} :: rabbitmq_fbservices, ${msg.content.toString()}`);
        // //         if (response.error) {
        // //             callback(response.error);
        // //         }
        // //         else {
        // //             callback(null, response.data);
        // //         }
        // //     }
        // // });
    }

    auth_facebook_res(correlationId, callback){
        // const queueName_res = env.rabbitmq.queue.res.authFacebook;
        // this.consumer.assertQueue(queueName_res, { durable: true });
        // this.consumer.consume(queueName_res, (msg) => {
        //     this.consumer.ack(msg);
        //     this.consumer.cancel(msg.fields.consumerTag);
        //     // console.log(chalk.yellow("response"));
        //     // console.log(chalk.yellow(correlationId));            
        //     // console.log(chalk.yellow(msg.properties.correlationId === correlationId));
        //     callback(msg);
        //     // if (msg.properties.correlationId === correlationId) {
        //     //     const response = JSON.parse(msg.content.toString());
        //     //     logger.info(`${correlationId} :: rabbitmq_fbservices, ${msg.content.toString()}`);
        //     //     if (response.error) {
        //     //         callback(response.error);
        //     //     }
        //     //     else {
        //     //         callback(null, response.data);
        //     //     }
        //     // }
        // });
    }

    //Add and consume Email Data to Email Queue
    addEmailDataInQueue(message, callback) {
        // const queueName_req = env.rabbitmq.queue.req.email;

        // this.producer.assertQueue(queueName_req, { durable: true });
        // this.producer.sendToQueue(queueName_req, Buffer.from(JSON.stringify(message)));
    }

    getBalance(message) {
        // const { correlationId, ...data } = message;
        // const queueName_req = env.rabbitmq.queue.req.balance;
        // const queueName_res = env.rabbitmq.queue.res.balance;

        // this.producer.assertQueue(queueName_req, { durable: true });
        // this.producer.sendToQueue(queueName_req, Buffer.from(JSON.stringify(data)), { correlationId });

        // return new Promise((resolve, reject) => {
        //     this.consumer.assertQueue(queueName_res, { durable: true });
        //     this.consumer.consume(queueName_res, (msg) => {
        //         this.consumer.ack(msg);
        //         if (msg.properties.correlationId === correlationId) {
        //             const response = JSON.parse(msg.content.toString());
        //             if (response.error) {
        //                 reject(response.error);
        //             }
        //             else {
        //                 resolve(response.data);
        //             }
        //         }
        //     });
        // });
    }
}

module.exports = new AMQPRegisterServices(env.rabbitmq.server);