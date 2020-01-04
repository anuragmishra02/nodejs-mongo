const env = require("../../config/env_variables").getEnv();
const pubsub = require("../../config/pubsub");

exports.FBServices_Authentication = 
    async (data, correlationId, requestId) =>  await pubsub(
        "FBService_Authentication",
        env.rabbitmq.queue.req.authFacebook, 
        env.rabbitmq.queue.res.authFacebook, 
        data, 
        correlationId,
        requestId
    );

exports.StellarServices_CreateAccount = 
    async (data, correlationId, requestId) =>  await pubsub(
        "StellarService_CreateAccount",
        env.rabbitmq.queue.req.accountCreation, 
        env.rabbitmq.queue.res.accountCreation, 
        data, 
        correlationId,
        requestId
    );

exports.StellarServices_FreeTokens = 
    async (data, correlationId, requestId) => await pubsub(
        "StellarService_FreeTokens",
        env.rabbitmq.queue.req.freeTokens,
        env.rabbitmq.queue.res.freeTokens,
        data,
        correlationId,
        requestId
    );
