const typeorm = require("typeorm"); // import * as typeorm from "typeorm";
const env = require("../config/env_variables").getEnv();

module.exports = typeorm.createConnection({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    //username: "test",
   // password: "test",
    database: "StackerUsers",
    //synchronize: true,
   // logging: false,
    entities: [
        require("../entity/AuthProviders"),
        require("../entity/AccountType"),
        require("../entity/counter")
       // require("../entity/AuthProviderDetails"),
       // require("../entity/UserDetails")       
            ], 
    useNewUrlParser: true 

}).then(function (connection) {
    console.log(" DB Connected !!!! ");
    return connection
}).catch(function (error) {
    console.log("Error: ", error);
});