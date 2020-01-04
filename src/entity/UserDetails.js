const EntitySchema = require("typeorm").EntitySchema; // import {EntitySchema} from "typeorm";
const UserDetailsModel = require("../model/UserDetailsModel");
const AccountTypeModel = require("../model/AccountType");


module.exports = new EntitySchema({
    name: UserDetailsModel,
    target: UserDetailsModel,
    columns: {
        authProviderUserId: {
            primary: true,
            generated: true,
            type: "int"
        },
        attributeName: {
            type: "varchar"
        },
        acccountStatus: {
            type: "varchar"
        },
        privacy: { type: "varchar" },
        termsCondition: { type: "varchar" },
        createdDate: { type: "varchar" },
        updateDate: { type: "varchar" }
    },
    relations: {
        accountTypeId: {
            target: AccountTypeModel,
            type: "many-to-one",
            joinTable: true,
            cascade: true
        },
    }
})