const fs = require("fs");

const variables = {    
    MongoDB_Url: "MongoDB_Url", 
    MongoDB_Name: "MongoDB_Name", 
    AMPQ_Url: "AMPQ_Url", 
    AMPQ_Queue_Req_AccountCreation: "AMPQ_Queue_Req_AccountCreation", 
    AMPQ_Queue_Res_AccountCreation: "AMPQ_Queue_Res_AccountCreation", 
    AMPQ_Queue_Req_FreeTokens: "AMPQ_Queue_Req_FreeTokens", 
    AMPQ_Queue_Res_FreeTokens: "AMPQ_Queue_Res_FreeTokens", 
    AMPQ_Queue_Req_AuthFacebook: "AMPQ_Queue_Req_AuthFacebook", 
    AMPQ_Queue_Res_AuthFacebook: "AMPQ_Queue_Res_AuthFacebook", 
    AMPQ_Queue_Req_Balance: "AMPQ_Queue_Req_Balance",
    AMPQ_Queue_Res_Balance: "AMPQ_Queue_Res_Balance",
    AMPQ_Queue_SendEmail: "AMPQ_Queue_SendEmail", 
    Privacy_Version: "Privacy_Version", 
    Terms_Version: "Terms_Version",
    PORT: "PORT",
    Userservice_Exchnage:"Userservice_Exchnage"
};

class Env {

    constructor(){
        this.value = {
            mongodb: {
                url: null,
                dbName: null
            },
            rabbitmq: {
                server: null,
                queue: {
                    req: { accountCreation: null, freeTokens: null, authFacebook: null, balance: null, email: null },
                    res: { accountCreation: null, freeTokens: null, authFacebook: null, balance: null }
                },
                exchange:null
            },
            terms_version: null,
            privacy_version: null,
            port: null
        };
    }

    updateEnv(key, value){
        switch(key){
            case variables.Userservice_Exchnage:
                this.value.rabbitmq.exchange=value;
                break;
            case variables.AMPQ_Queue_Req_AccountCreation:
                this.value.rabbitmq.queue.req.accountCreation = value;
                break;
            case variables.AMPQ_Queue_Res_AccountCreation:
                this.value.rabbitmq.queue.res.accountCreation = value;
                break;
            case variables.AMPQ_Queue_Req_AuthFacebook:
                this.value.rabbitmq.queue.req.authFacebook = value;
                break;
            case variables.AMPQ_Queue_Res_AuthFacebook:
                this.value.rabbitmq.queue.res.authFacebook = value;
                break;
            case variables.AMPQ_Queue_Req_FreeTokens:
                this.value.rabbitmq.queue.req.freeTokens = value;
                break;                        
            case variables.AMPQ_Queue_Res_FreeTokens:
                this.value.rabbitmq.queue.res.freeTokens = value;
                break;
            case variables.AMPQ_Queue_Req_Balance:
                this.value.rabbitmq.queue.req.balance = value;
                break;
            case variables.AMPQ_Queue_Res_Balance:
                this.value.rabbitmq.queue.res.balance = value;
                break;
            case variables.AMPQ_Queue_SendEmail:
                this.value.rabbitmq.queue.req.email = value;
                break;
            case variables.AMPQ_Url:
                this.value.rabbitmq.server = value;
                break;    
            case variables.MongoDB_Name:
                this.value.mongodb.dbName = value;
                break;
            case variables.MongoDB_Url:
                this.value.mongodb.url = value;
                break;
            case variables.Privacy_Version:
                this.value.terms_version= value;
                break;
            case variables.Terms_Version:
                this.value.privacy_version = value;
                break;
            case variables.PORT:
                this.value.port = value;
            default:
                return null;
        }
    }

    parse(){
        Object.keys(variables).forEach((envKey) => {
            const envValue = process.env[envKey];
            if(envValue === null || envValue === void(0)){
                throw `${envKey} is undefined in process.env. 
If the application is started in local environment please add it in the .env file. 
The list of variables with values(dev) is provided in readme file.
`;
            }
            else if(typeof envValue === "string" && envValue.trim().length === 0){
                throw `${envKey} is undefined in process.env. 
If the application is started in local environment please add it in the .env file. 
The list of variables with values(dev) is provided in readme file.
`;
            }
            else{
                this.updateEnv(envKey, envValue);
            }
        });
    }

    getEnv(){
        return {...this.value};
    }    
}

module.exports = new Env();