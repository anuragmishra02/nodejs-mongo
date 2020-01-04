const EntitySchema = require("typeorm").EntitySchema; // import {EntitySchema} from "typeorm";
const AuthProviderModel = require("../model/AuthProviders");
//const { O } = require("typeorm");

module.exports = new EntitySchema({

    name: "AuthProvider",
    target: AuthProviderModel,
    columns: {
        providerId:
        {
            primary: true,
            type: "int",
            objectId:true
        },
        providerName
            : {
            type: "varchar",
            
        },
        createdDate: {
            type: "datetime"
        }

    }
})