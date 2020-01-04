const amqp = require("amqplib");

class RabbitMQ {

    constructor() {                
        this.producer = null;
        this.consumer = null;
    }    

    async config(server) {
        const connection = await amqp.connect(server);
        this.producer = await connection.createChannel();
        this.consumer = await connection.createChannel(); 
        console.log(`Connected to rabbitmq... ${server}`);       
    }

    getProducer(){
        return this.producer;
    }

    getConsumer(){
        return this.consumer;
    }
}

module.exports = new RabbitMQ();
