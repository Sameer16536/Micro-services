const amqp = require('amqp')
const  RABBITMQ_URL = process.env.RABBITMQ_URL

let connection,channel 

const connect =async()=>{
    connection = await amqp.connect(RABBITMQ_URL)
    channel = await connection.createChannel()
    console.log('COnnected to RabbitMQ')
}



async function subscribeToQueue(queueName, callback) {
    if (!channel) await connect();
    await channel.assertQueue(queueName);
    channel.consume(queueName, (message) => {
        callback(message.content.toString());
        channel.ack(message);
    });
}

async function publishToQueue(queueName, data) {
    if (!channel) await connect();
    await channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(data));
}

module.exports = {
    subscribeToQueue,
    publishToQueue,
    connect,
};