const routeParams = require("../config/routes-params.json");
const isEmpty = val => val === null || val === void (0);

module.exports = (app) => (...middleware) => {
    return new class {

        middeware(req, res, next){            
            middlewares.forEach((mw) => {
                mw(req, res, next);
            });
        }

        get(route, controller){
            return app.get(route, this.middeware, controller);
        }

        post(route, controller){
            return app.get(route, this.middeware, controller);
        }
    }
};
