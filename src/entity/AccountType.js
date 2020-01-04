const EntitySchema = require("typeorm").EntitySchema; // import {EntitySchema} from "typeorm";
const AccountTypeModel = require("../model/AccountType");

module.exports = new EntitySchema({

    name :"AccountType",
    target:AccountTypeModel,
    columns:{
        accountTypeId:{
            primary :true,
            type:"int",
            objectId:true
        },
       accountTypeName:{
           type:"varchar"
       }
    }
})