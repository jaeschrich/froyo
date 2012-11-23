var connect = require("connect"),
utils = require("./froyo.utils"),
App = require("./app"),
static = require("./froyo.static");

utils.extend(exports, connect.middleware);

/**
* Create a new app (extended version of connect app)
* @return {Object} A new app
*/
exports.app = function () {
    var app = connect();
	utils.extend(app, App.app);
	app.use(App.router(app));
    return app;
}

exports.extend = utils.extend;
exports.addTemplate = static.addTemplate;
exports.getTemplate = static.getTemplate;
