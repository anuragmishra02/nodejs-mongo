const StackerMongoConnect = require("../utils/MongoConnect");
const { MongoError } = require("../utils/Error");
// const responseCode = require("../../../response-codes");

class RegisterUser extends StackerMongoConnect {

    collections() {
        return ["UserDetails", "UserSeed"];
    }

    async addUser({ userId, name, email, account, accountType, mnemonic }) {
        try {
            const result_userDetails = await this.userDetails.insertOne({
                userId,
                name,
                email,
                account: "",
                accountType: "BASIC",
                registeredOn: Date.now(),
                privacy: "1.0",
                termsConditions: "1.0",
                accountStatus: "INITIATED"
            });

            return result_userDetails;
        }
        catch (ex) {
            console.log(ex);
            throw MongoError("fbUID", "Insert new user in UserDetails collection", ex);
        }
    }

    async updateStellarAccount({ userId, account, encryptedMnemonic }) {
        try {
            const result_userSeed = await this.userSeed.insertOne({
                account,
                mnemonic: encryptedMnemonic
            });            
        }
        catch (ex) {
            console.log(ex);
            throw MongoError("fbUID", "Insert stellar account details in UserSeed collection", ex);
        }

        try {
            await this.userDetails.updateOne(
                { userId },
                {
                    $set: {
                        account,
                        accountStatus: "CREATED"
                    }
                }
            );
        }
        catch (ex) {
            console.log(ex);
            throw MongoError("fbUID", "Update stellar account details in UserDetails collection", ex);
        }
    }

    async changeAccountStatus({ userId, accountStatus }) {
        try {
            const result_updateAccountStatus = await this.userDetails.updateOne({ userId }, { $set: { accountStatus } });
            return result_updateAccountStatus;
        }
        catch (ex) {
            throw MongoError("fbUID", "Change account_status in UserDetails collection", ex);
        }
    }

    async findUser(userId) {        
        try {
            const users = await this.userDetails.find({ userId }).toArray();            
            if(users.length > 0){
                return users[0];
            }
            else{
                throw "User does not exists";
            }
        }
        catch (ex) {
            throw ex;
        }
    }
}

module.exports = new RegisterUser();