let controller = require('./log.controller');

module.exports = function(app) {
    app.post("/log/record", controller.allowOrigin, controller.record);
    app.get("/log/getLog", controller.allowOrigin, controller.getLog);
    app.get("/log/getRules", controller.allowOrigin, controller.getRules);
    app.get("/log/getType", controller.allowOrigin, controller.getType);
};