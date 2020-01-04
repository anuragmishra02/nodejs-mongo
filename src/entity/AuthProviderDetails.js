const EntitySchema = require("typeorm").EntitySchema; // import {EntitySchema} from "typeorm";
const AuthProviderDetailsModel = require("../model/AuthProviderDetails");
const UserDetailsModel = require("../model/UserDetailsModel");
const AuthProviderModel = require("../model/AuthProviders");



module.exports = new EntitySchema({

    name: "AuthProviderDetails",
    target: AuthProviderDetailsModel,
    columns: {
        
        name
            : {
            type: "varchar"
        },
        email: {
            type: "varchar"
        },
        createdDate:{
            type:"datetime"
        },
        relations:{
            authProviderUserId:
            {
                target: UserDetailsModel,
                type: "one-to-one",
                joinTable: true,
                cascade: true 
            },
            providerId:
            {
                target: AuthProviderModel,
                type: "one-to-one",
                joinTable: true,
                cascade: true 
            },

        }

    }
})