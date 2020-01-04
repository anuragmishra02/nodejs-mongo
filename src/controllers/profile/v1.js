const registerUser = require("../../database");
const logger = require("../../config/logger");
const amqp = require("./amqp");
const uuidv4 = require('uuid/v4');

module.exports = async (req, res) => {

    const requestId = uuidv4();
    logger.info(`/profile ${req.method} requestId: ${requestId}`);
    
    try{
        const { userId } = req.query;
        const correlationId = uuidv4();

        logger.info(`${requestId}__${userId}: Find user in stacker database`);
        const user = await registerUser.findUser(userId);

        logger.info(`${requestId}: Request StellarServices_Balance`);
        const balance = await amqp.StellarServices_Balance({ account: user.account }, correlationId, requestId);
        console.log(balance);
        logger.info(`${requestId}__${userId} Sending response to client`);
        res.json({
            name: user.name,
            email: user.email,
            account_type: user.accountType,
            locked: false,
            active: true,
            balance: {
                free: balance.EKRFREE ? balance.EKRFREE : "0",
                postpaid: balance.EKR ? balance.EKR : "0"
            }
        });
    }    
    catch(ex){
        console.log(ex);
        res
            .status(500)
            .send("Request Failed");
    }
};