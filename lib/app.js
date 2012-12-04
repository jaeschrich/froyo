var http = require("http"),
utils = require("./utils"),
response = require("./response"),
url = require("url"),
toothbrush = require("toothbrush"),
routes = require("routes");

function router(app) {
	return function(req, res, next){var path = url.parse(req.url).pathname;
	if (app._router.match(path) !== undefined) {
		res._app = app;
		utils.extend(res, response);
		try {
		    var route = app._router.match(path);
		    req.params = route.params;
		    req.splats = route.splats;
		    try {
		        route.fn[req.method.toLowerCase()].call(this, req, res);
		    }
		    catch (e) {
		        next(app.get("mode") === "development"?e:"405: Method not allowed.")
		    }
		}
		catch (e) {
		    next(app.get("mode") === "development"?e:"404: Not Found")
		}
	}
	else {
		next()
	}
	}
  }

var App = function(){};
App._routem = router;

App._router = new routes.Router();
App.scoop = function (map) {
	if (!utils.inside(this.stack), router.toString()) this.use(this._routem(this));
        var keys = Object.keys(map);
        var that = this;
        keys.forEach(function (key) {
            if (typeof map[key] === "function") {
                var fn = map[key]
                map[key] = { get: fn }
            }
            that._router.addRoute(key, map[key]);
        });
        return this;
}

App.start = function () {
	var server = http.createServer(this);
	server.listen.apply(server, arguments);
}

App._dat = {};

App.set = function(key, val){
	this._dat[key] = val;
}

App.get = function(key){
	return this._dat[key];
}

App.set("mode", "development");
App.set("template", toothbrush);

exports.app = App;
