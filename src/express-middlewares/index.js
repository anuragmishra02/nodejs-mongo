const bodyParser = require("body-parser");
const cors = require("cors");
const requiredParams = require("./requiredFields");

const applyBodyParser = (app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
};

const applyCORS = (app) => {
    app.use(cors());
};

module.exports = (app) => {
    applyBodyParser(app);
    applyCORS(app);
    // app.use(requiredParams);
};