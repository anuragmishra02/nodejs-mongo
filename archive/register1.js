const registerUser = require("../src/database").registerUser;
const stackerAmqp = require("../src/message-queue/amqp-stacker");

const handleFreeTokens = (_err, _data) => {
    if (data1 === "Transferred Tokens") {
        await registerUser.changeAccountStatus({
            userId,
            accountStatus: "Completed"
        });
        //Calling email Services
        stackerAmqp.addEmailDataInQueue({ name: userData.name, email: userData.email, userRegistration:true,freeTokens:10 })

        res.json({
            status: true,
            Result: "User registered"
        });
    }
};

const handleCreateAccount = async (_err, _data) => {
    userData.name, async (err, data) => {
        const stellarAccount = JSON.parse(data);

        await registerUser.updateStellarAccount({
            userId,
            account: stellarAccount.account,
            encryptedMnemonic: stellarAccount.mnemonic
        });

        stackerAmqp.sendFreeToken(data, handleFreeTokens);
    }
}

const handleFacebookResponse = async (_err, _data) => {
   
    const queueData = JSON.parse(data);
    userData = queueData.data;

    if(queueData.error === null){
        console.log(`\nRegister Services`);                
        const user = await registerUser.addUser({ userId: userData.id, name: userData.name, email: userData.email });
        console.log(`User registered in DB`);
        console.log(user);

        stackerAmqp.createAccount(handleCreateAccount);
    }
    else{
        console.log(`Error from Facebook Auth Services`);
        console.log(queueData.error);
        res.json({
            status: false,
            message: "Error authenticating user"
        });
    }            
};

module.exports = async (req, res) => {

    const { userId, name, email, inputAccessToken } = req.body;

    try {        
        const message = {
            fbUID: userId,
            inputAccessToken
        }

        let userData = null;
        stackerAmqp.validateUserByFBGraph(message, async (err, data) => {
            console.log(`\nFrom "Facebook Auth Services"`);
            console.log(`Data: ${JSON.stringify(data, null, 2)}`);
            
            const queueData = JSON.parse(data);
            userData = queueData.data;

            if(queueData.error === null){
                console.log(`\nRegister Services`);                
                const user = await registerUser.addUser({ userId: userData.id, name: userData.name, email: userData.email });
                console.log(`User registered in DB`);
                console.log(user);

                stackerAmqp.createAccount(userData.name, async (err, data) => {
                    const stellarAccount = JSON.parse(data);

                    await registerUser.updateStellarAccount({
                        userId,
                        account: stellarAccount.account,
                        encryptedMnemonic: stellarAccount.mnemonic
                    });

                    stackerAmqp.sendFreeToken(
                        data,
                        async (err, data1) => {
                            if (data1 === "Transferred Tokens") {
                                await registerUser.changeAccountStatus({
                                    userId,
                                    accountStatus: "Completed"
                                });
                                //Calling email Services
                                stackerAmqp.addEmailDataInQueue({ name: userData.name, email: userData.email, userRegistration:true,freeTokens:10 })

                                res.json({
                                    status: true,
                                    Result: "User registered"
                                });
                            }
                        }
                    );

                });
            }
            else{
                console.log(`Error from Facebook Auth Services`);
                console.log(queueData.error);
                res.json({
                    status: false,
                    message: "Error authenticating user"
                });
            }            
        });
    }
    catch (ex) {
        console.log("\nError sending response\n");
        console.log(ex);
        res.json({
            status: false,
            message: "Internal Server Error"
        });
    }

};
