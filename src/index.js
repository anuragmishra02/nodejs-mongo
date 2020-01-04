const express = require("express");
const app = express();
const env = require("./config/env_variables").getEnv();
const registerUser = require("./database");
const controllers = require("./controllers");
const amqpStacker = require("./utils/RabbitMQ");
const DBConnection = require("./utils/DBConnection");

app.set('trust proxy')

require("./express-middlewares")(app);

app.post("/user/v1/register", controllers.register.v1);
app.post("/user/v1/login", controllers.login.v1);
app.get("/user/v1/profile", controllers.profile.v1);

process.on('uncaughtException', function (err) {    
    console.log(err.message);
    console.log(err.stack);
});

app.use((req, res, next) => {
    res.json({
        data: `${req.originalUrl} not found`
    });    
});

(async () => {
    try {
       // await registerUser.connect(env.mongodb.url, env.mongodb.dbName);
      //console.log(DBConnection);
        await amqpStacker.config(env.rabbitmq.server);
        
        app.listen(env.port, () => console.log("Registration Services started at port %s", env.port));
    }
    catch (ex) {
        console.log(`\nError starting the service\n`);
        console.log(ex);
        process.exit(0);
    }
})()
