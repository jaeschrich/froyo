var assert = require("assert"),
froyo = require("../froyo"),
fs = require("fs"),
request = require("supertest");

describe("froyo", function () {
    var app = froyo.app();
    describe("#app", function () {
        it("should use middleware", function (done) {
            app.use(froyo.static("./"));
            done();
        })
        it('should serve requests with ids and splats', function (done) {
            function namer(req, res) {
                res.writeHead(200, { "Content-Type": "text/plain" })
                assert.equal(req.params.name, "bob");
                res.end(req.params.name)
            };

            function splat(req, res){
            	res.writeHead(200, {"Content-Type": "text/plain"});
            	res.end(req.splats.join(" "));
            }
            app.scoop({
                '/name/:name': namer,
                '/splat/*/test/*': splat
            });

            request(app)
            .get("/name/bob")
            .expect(200)
            .expect("Content-Type", "text/plain")
            .expect("bob")

            request(app)
            .get("/splat/Hello/test/World")
            .expect(200)
            .expect("Content-Type", "text/plain")
            .expect("Hello World", done);
        })
        it("should have get and posts methods", function (done) {
            var index = {
                get: function (req, res) {
                    res.writeHead(200)
                    res.end("Hi")
                },
                post: function (req, res) {
                    res.writeHead(200)
                    req.on("data", function (d) {
                        assert.equal(d, "hi", "The post data should be hi")
                    })
                    res.end("hi")
                }
            }
            app.scoop({
                '/': index
            });
            request(app)
            .get("/")
            .expect(200)
            .expect("Hi")

            request(app)
            .post("/")
            .send("hi")
            .end(function (err, res) {
                if (err) done(err);
                else done();
            });
        });
        it("should use the res.file method", function(done){
			function test(req, res){
				res.file(__dirname+"/test.html")
			}
			app.scoop({
				'/': test
			});
			
			request(app)
			.get("/")
			.expect(200)
			.expect("Content-Type", "text/html")
			.expect("<!doctype html><html><body>Hi {{me.name}}</body></html>", done);
        });
        it("should have a res.redirect function", function(done){
        	function index(req, res){
        		res.writeHead(200);
				res.end("Hello World");
        	}
        	function test(req, res){
				res.redirect("/");
        	}
        	app.scoop({
        		'/': index,
        		'/test': test
        	});
        	request(app)
        	.get('/test')
        	.expect(303)
        	.expect("Location", "/", done);
        });
    })
    describe("#static", function () {
        it("should compile mustache templates", function (done) {
            function index(req, res) {
                res.render(__dirname + "/test.html", { me: { name: "bob"} });
            }
            app.scoop({
                '/': index
            });

            request(app)
            .get("/")
            .expect(200)
            .expect("Content-Type", "text/html")
            .expect("<!doctype html><html><body>Hi bob</body></html>", done)
        });
        it("should add a new template", function () {
			function test(file, res, opts) {
				    //pass
				}
            froyo.addTemplate("test", test);
            assert.equal(test, froyo.getTemplate("test"));
        });
    });
});
