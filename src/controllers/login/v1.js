const registerUser = require("../../database");
const amqp = require("./amqp");
const logger = require("../../config/logger");
const uuidv4 = require('uuid/v4');
const env = require("../../config/env_variables").getEnv();

module.exports = async (req, res) => {
    const requestId = uuidv4();

    try {
        logger.info(`/login ${req.method} requestId: ${requestId}`);
        const { accessToken, signedRequest, authProvider } = req.body;
        const correlationId = uuidv4();
        let userAuthData = null;

        if (authProvider === "facebook") {
            logger.info(`${requestId}: Request FBServices_Authentication`);
            userAuthData = await amqp.FBServices_Authentication({ accessToken, signedRequest }, correlationId, requestId);
            logger.info(`${requestId}: User ${userAuthData.id} authenticated by facebook services`);
        }

        if (userAuthData === null) {
            res.json({
                data: "No scheme exists to authenticate validate user"
            });
            return void (0);
        }
        else {
            logger.info(`${requestId}__${userAuthData.id} Request StellarServices_CreateAccount`);
            await registerUser.findUser(userAuthData.id);

            logger.info(`${requestId}__${userAuthData.id} Sending response to client`);
            res.json({
                data: "User logged in stacker"
            });
        }
    }
    catch (ex) {
        console.log(ex);
        let error = "";
        if (ex.type && ex.type === "Facebook") {
            const msg = typeof ex.message === "object" ? JSON.stringify(ex.message) : ex.message;
            logger.info(`${requestId}: Facebook Services error, ${msg}`);
            error = msg;
        }
        res.json({
            messgae: error
        });
    }
};
