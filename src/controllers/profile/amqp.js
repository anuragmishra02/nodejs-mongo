const env = require("../../config/env_variables").getEnv();
const pubsub = require("../../config/pubsub");

exports.StellarServices_Balance = 
    async (data, correlationId, requestId) => await pubsub(
        "StellarService_Balance",
        env.rabbitmq.queue.req.balance,
        env.rabbitmq.queue.res.balance,
        data,
        correlationId,
        requestId
    );
