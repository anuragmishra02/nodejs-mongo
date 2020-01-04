module.exports = (app) => (...middlewares) => ({
    get: (routePath, controller) => {
        app.get(
            routePath, 
            (req, res, next) => {
                middlewares.forEach(mw => mw(req, res, next))
            },
            controller
        )
    },
    post: (routePath, controller) => {
        app.post(
            routePath, 
            (req, res, next) => {
                middlewares.forEach(mw => mw(req, res, next))
            },
            controller
        )
    }
});