var mongoose =require("mongoose");
var Schema = mongoose.Schema;

var userSeedSechema = new Schema({
    account:string,
    mnemonic:string
    });
    
    var UserSeed = mongoose.model('UserSeed',userSeedSechema);
    module.exports = UserSeed;