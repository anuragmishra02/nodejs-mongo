const EntitySchema = require("typeorm").EntitySchema; // import {EntitySchema} from "typeorm";
const counterModel = require("../model/counter");

module.exports = new EntitySchema({

    name :"counter",
    target:counterModel,
    columns:{
        _id:{
            primary :true,
            type:"varchar",
            objectId:true
        },
        sequence_val:{
           type:"int"
       }
    }
})