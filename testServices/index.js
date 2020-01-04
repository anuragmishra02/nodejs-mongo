require("dotenv").config({ path: "../.env" });
require("../src/config/env_variables").parse();

const express = require("express");
const app = express();
const env = require("../src/config/env_variables").getEnv();
const registerUser = require("../src/database");
const amqp = require("./rabbit");
const fb = require("./facebook");
const uuid = require("uuid/v4");

require("../src/express-middlewares")(app);

app.post("/user/v1/register", async (req, res) => {
    const { accessToken, authProvider, signedRequest } = req.body;
    req.uuid = uuid();
    const v = uuid();
    console.log(`Incoming request: ${req.uuid}`);
    fb.request(amqp.producer, { correlationId: req.uuid, accessToken, authProvider, signedRequest });
    fb.response(amqp.consumer, v, (msg) => {     
        console.log(msg.fields);
        console.log(req.uuid);
        console.log(msg.properties.correlationId);           
        // if(msg.properties.correlationId === correlationId){
            res.json({
                data: msg
            });
        // }
    });
});

process.on('uncaughtException', function (err) {    
    console.log(err.message);
    console.log(err.stack);
});

(async () => {
    try {
        await registerUser.connect(env.mongodb.url, env.mongodb.dbName);
        await amqp.config();
        
        app.listen(env.port, () => console.log("Registration Services started at port %s", env.port));
    }
    catch (ex) {
        console.log(`\nError starting the service\n`);
        console.log(ex);
        process.exit(0);
    }
})()
