const registerUser = require("../../database");
const amqp = require("./amqp");
const logger = require("../../config/logger");
const uuidv4 = require('uuid/v4');
const env = require("../../config/env_variables").getEnv();
const UserDetailsRepo = require("../../repository/UserDetailsRepo");

module.exports = async (req, res) => {
    const requestId = uuidv4();
    const correlationId = uuidv4();
    try {
        logger.info(`/register ${req.method} requestId: ${requestId}`);
        const { accessToken, signedRequest, authProvider } = req.body;

        let userAuthData = null;

        if (authProvider === "facebook") {

            logger.info(`${requestId}: Request FBServices_Authentication`);
            const authProviderRes = await UserDetailsRepo.findAuthProvider(authProvider);
           // console.log(authProviderRes);
            if (authProviderRes.length === 0) {
                console.log(authProviderRes.length);
                await UserDetailsRepo.createAuthProvider(authProvider);
            }

            // userAuthData = await amqp.FBServices_Authentication({ accessToken, signedRequest }, correlationId, requestId);
            // logger.info(`${requestId}: User ${userAuthData[0]} authenticated by facebook services`);
            // logger.info(`incoming correlation id >>>> ${userAuthData[1]}`);
        }

        if (userAuthData[0] === null) {
            res.json({
                data: "No scheme exists to authenticate validate user"
            });
            return void (0);
        }
        else {
            if (userAuthData[1] === correlationId) {
                logger.info(`${requestId}__${userAuthData[0].id} Add user to database`);

                //Create model for UserService and for UserAuthProviderDetails
                // await registerUser.addUser({
                //     userId: userAuthData[0].id,
                //     name: userAuthData[0].name,
                //     email: userAuthData[0].email
                // // });

                // logger.info(`${requestId}__${userAuthData[0].id} Request StellarServices_CreateAccount`);
                // const stellar_account = await amqp.StellarServices_CreateAccount("", correlationId, requestId);

                // logger.info(`${requestId}__${userAuthData[0].id} Update account status to initiated`);
                //This model is going to add in Setllaer Service End
                // await registerUser.updateStellarAccount({
                //     account: stellar_account[0].account,
                //     encryptedMnemonic: stellar_account[0].mnemonic,
                //     userId: userAuthData[0].id
                // });

                logger.info(`${requestId}__${userAuthData[0].id} Request StellarServices_FreeTokens`);
                await amqp.StellarServices_FreeTokens(stellar_account, correlationId, requestId);

                logger.info(`${requestId}__${userAuthData[0].id} Update account status to completed`);

                //This model is going to add in Stellar Service and updated after token is transfered to a account.
                // await registerUser.changeAccountStatus({
                //     userId: userAuthData[0].id,
                //     accountStatus: "COMPLETED"
                // });

                logger.info(`${requestId}__${userAuthData[0].id} Sending response to client`);
                res.status(200).json({
                    data: "User registerd in stacker"
                });
            }
        }
    }
    catch (ex) {
        console.log(ex);
        let error = "";
        if (ex[0].type && ex[0].type === "Facebook") {
            const msg = typeof ex[0].message === "object" ? JSON.stringify(ex[0].message) : ex[0].message;
            logger.info(`${requestId}: Facebook Services error, ${msg}`);
            error = msg;
        }
        if (ex[0].type && ex[0].type === 'OAuthException') {
            const msg = typeof ex[0].message === "object" ? JSON.stringify(ex[0].message) : ex[0].message;
            logger.info(`${requestId}: Facebook Services error, ${msg}`);
            error = msg;
        } else {
            const msg = typeof ex[0].message === "object" ? JSON.stringify(ex[0].message) : ex[0].message;
            logger.info(`${requestId}: Services error, ${msg}`);
            error = msg;
        }
        console.log(correlationId);
        console.log(ex[1]);
        if (correlationId === ex[1]) {
            res.status(400).json({
                message: error
            });
        }

    }

    // try {
    //     let correlationId = null;
    //     const { accessToken, signedRequest, authProvider } = req.body;
    //     const _event = new event();

    //     if (authProvider.toLowerCase() === "facebook") {
    //         correlationId = uuidv4();
    //         logger.info(`Generating a request id: ${correlationId}`);
    //         logger.info(`${12}: controller_register, authenticate users by facebook`);
    //         amqp.auth_facebook({ accessToken, signedRequest }, async (_error_FB, _data_FB) => {
    //             if (_error_FB) {
    //                 logger.info(`${correlationId}: fbservices, error: ${_error_FB}`);
    //                 res.json({
    //                     error: "unable to register user"
    //                 });
    //             }
    //             else {
    //                 logger.info(`${correlationId}: controller_register, add user in database`);
    //                 await registerUser.addUser({
    //                     userId: _data_FB.id,
    //                     name: _data_FB.name,
    //                     email: _data_FB.email
    //                 });

    //                 logger.info(`${correlationId}: stellar_services_createAccount, requesting...`);
    //                 amqp.createAccount({ correlationId }, async (_error_XLMAccount, _data_XLMAccount) => {
    //                     if (_error_XLMAccount) {
    //                         logger.info(`${correlationId}: stellar_services_createAccount, error: ${_error_XLMAccount}`);
    //                         res.json({
    //                             error: "unable to register user"
    //                         });
    //                     }
    //                     else {
    //                         logger.info(`${correlationId}: stellar_services_createAccount, got response`);

    //                         logger.info(`${correlationId}: controller_register, update account status for this user`);
    //                         await registerUser.updateStellarAccount({
    //                             userId: _data_FB,
    //                             account: _data_XLMAccount.account,
    //                             encryptedMnemonic: _data_XLMAccount.mnemonic
    //                         });

    //                         logger.info(`${correlationId}: stellar_services_freeTokens, requesting...`);

    //                         amqp.sendFreeToken({ ...data, correlationId }, async (_error_EKRFREE, _data_EKRFREE) => {
    //                             if (_error_EKRFREE) {
    //                                 logger.info(`${correlationId}: stellar_services_freeTokens, error: ${_error_EKRFREE}`);
    //                                 res.json({
    //                                     error: "unable to register user"
    //                                 });
    //                             }
    //                             else {
    //                                 logger.info(`${correlationId}: stellar_services_freeTokens, got response`);

    //                                 logger.info(`${correlationId}: controller_register, update account status for this user`);
    //                                 await registerUser.changeAccountStatus({
    //                                     userId: id,
    //                                     accountStatus: "Completed"
    //                                 });

    //                                 amqp.addEmailDataInQueue({
    //                                     name: name,
    //                                     email: email,
    //                                     userRegistration: true,
    //                                     freeTokens: 10
    //                                 });

    //                                 logger.error(`${correlationId} :: Request processed sendin response`);
    //                                 res.json({ data: "User registered successfully" });
    //                             }
    //                         });
    //                     }
    //                 });
    //             }
    //         });
    //     }
    //     else {
    //         res.status(409).json({
    //             error: "no authentication scheme found"
    //         });
    //         return void (0);
    //     }

    // }
    // catch (ex) {
    //     logger.error(`${12} :: Error when registering user: ${ex}`);
    //     res.json({
    //         data: "error when registering"
    //     });
    // }
};
