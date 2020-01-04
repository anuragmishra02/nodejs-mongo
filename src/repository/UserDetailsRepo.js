const dbConnection = require("../utils/DBConnection");
const UserDetailsModel = require("../model/UserDetailsModel");
const AuthProviderModel = require("../model/AuthProviders");
const AuthProviderDetailsModel = require("../model/AuthProviderDetails");
const AccountTypeModel = require("../model/AccountType");
const counterModel = require("../model/counter");
const AuthProviderEntity = require("../entity/AuthProviders");
const { getMongoManager, getManager, getMongoRepository, getConnection } = require("typeorm");

class USerDetailRepo {
    // manager = getManager();
    //This function is used to insert a record of different auth provider like fb,google,linkedin
    async createAuthProvider(authProviderName) {
        try {
            //console.log(dbConnection);
            let authProviderSeqVal = this.getNextSequenceValue("authProviderSeq");
            console.log("seq val ", authProviderSeqVal);
            let authProviderObj = new AuthProviderModel();
            authProviderObj.providerId = authProviderSeqVal;
            authProviderObj.providerName = authProviderName;
            authProviderObj.createdDate = new Date();
            const manager = getManager();
            await manager.save(authProviderObj);
        } catch (ex) {
            console.log(ex)
        }

    }

    async findAuthProvider(name) {
        try {
            console.log("findAuthProvider");
            const manager = getManager();
            const authProvider = await manager.find(AuthProviderModel, { providerName: name });
            //console.log(authProvider);
            return authProvider;
        } catch (ex) {
            console.log(ex);
        }
    }

    async findAccountType(accountName) {
        try {
            console.log("findAuthProvider");
            const manager = getManager();
            const accountType = await manager.find(AccountTypeModel, { accountTypeName: accountName });
            //console.log(authProvider);
            return accountType;
        } catch (ex) {
            console.log(ex);
        }
    }

    async saveUserAuthProviderDetails(userAuthProvidserData, authProviderId) {
        try {
            const userAuthProviderDetails = new AuthProviderDetailsModel();
            userAuthProviderDetails.authProviderId = authProviderId;
            userAuthProviderDetails.authProviderUserId = userAuthProvidserData.authProviderUserId;
            userAuthProviderDetails.name = userAuthProvidserData.name;
            userAuthProviderDetails.email = userAuthProvidserData.email;
            userAuthProviderDetails.createdDate = new Date();
            const manager = getManager();
            await manager.save(userAuthProviderDetails);
        } catch (ex) {
            console.log(ex);
        }

    }


    async saveUserDetails() {
        try {
            const userDetails = new UserDetailsModel(userDetailsData);

            userDetails.authProviderUserId = parseInt(authProviderUserId),
                userDetails.accountTypeId = userDetailsData.accountTypeId,
                userDetails.attributeName = userDetailsData.attributeName,
                userDetails.acccountStatus = userDetailsData.acccountStatus,
                userDetails.privacy = userDetailsData.privacy,
                userDetails.termsCondition = userDetailsData.termsCondition,
                userDetails.createdDate = userDetailsData.createdDate,
                userDetails.updateDate = userDetailsData.updateDate
            const manager = getManager();
            await manager.save(userDetails);
        } catch (ex) {
            console.log(ex);
        }
    }

    async getNextSequenceValue(sequenceName) {
        const manager = getMongoManager();
        console.log("seqname ", sequenceName);
        var seqdocument = await manager.find(counterModel, { _id: sequenceName });
        console.log(seqdocument[0]);
        var seqVal = seqdocument[0];
        // console.log(seqVal);
        console.log(seqVal.sequence_val);
        var oldSeq = seqVal.sequence_val;
        var incSeq = oldSeq + 1;
        //let counterObj = new counterModel();
        //counterObj._id = sequenceName;
        //counterObj.sequence_val = incSeq;
        console.log("new seq", incSeq);        
        var updateSeq = await manager.updateOne(counterModel,{_id:sequenceName}, { '$set':  {sequence_val : incSeq }});
        var updatedSeqVal = updateSeq[0];
        console.log(updatedSeqVal);
        return updateSeq[0].sequence_value;
    }
}
module.exports = new USerDetailRepo();


