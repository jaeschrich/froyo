var http = require("http"),
url = require("url"),
connect = require("connect"),
utils = require("./froyo.utils"),
routes = require("routes"),
static = require("./froyo.static");

utils.extend(exports, connect.middleware)

/**
* Create a new app (extended version of connect app)
* @return {Object} A new app
*/
exports.app = function () {
    var app = connect();
    app._router = new routes.Router();
    app.scoop = function (map) {
        var keys = Object.keys(map);
        keys.forEach(function (key) {
            if (typeof map[key] === "function"){
                var fn = map[key]
                map[key] = {get: fn}
            }
            app._router.addRoute(key, map[key]);
        });
        return this;
    }
    app.use(function (req, res, next) {
            var path = url.parse(req.url).pathname;
            if (app._router.match(path) !== undefined) {
                res.render = function (file, templateType, opts) {
                    if (!templateType) templateType = "mustache";
                    if (templateType === "mustache") {
                        static.mustache(file, res, opts);
                    }
                    else {
                        try {
                            froyo.staic[templateType](file, res, opts);
                        }
                        catch (e) {
                            next("Template type does not exists.");
                        }
                    };
                };
                try {
                    var route = app._router.match(path);
                    req.params = route.params;
                    try{
                         route.fn[req.method.toLowerCase()].call(this, req, res);
                         }
                   catch (e){
                           next("405 method not allowed")
                     }
                }
                catch (e) {
                   next(e)
                }
            }
            else {
                next()
            }
        })
    app.start = function (port) {
        http.createServer(app).listen(port)
    }
    return app;
}
exports.extend = utils.extend;
exports.addTemplate = static.addTemplate
