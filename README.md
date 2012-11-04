#Froyo: Node.js Micro Awesomeness
Froyo(frozen-yogurt) is a simple, expressive node.js micro-framework.

##Install

###With npm:

```
npm install froyo
```

###Build from source:

Needs Jake

```
git clone git://github.com/PyScripter255/frozen-yogurt.git

cd frozen-yogurt

jake install
```

##Example

```javascript
var froyo = require("froyo")

var thePosts = {
    "bob": ["Froyo is cool", "Have you tried it?"],
    "joe": ["Really?", "Nope"]
}

function givePosts(req, res){
    res.writeHead(200, {"Content-Type": "text/json"})
    res.end(JSON.stringify(thePosts))
}

function index(req, res){
    res.render("./index.html", "mustache", {lasestPost: "foobar"})
}

var postComment = {
    post: function(req, res){
        res.writeHead(200, {"Content-Type": "text/json"})
        var comment = "";
        req.on("data", function(data){
            var comment += data;
        })
        req.on("end", function(){
            posts[req.params.post].addComment(JSON.parse(comment))
        })
        }
}

froyo.scoop({
    "/": index,
    "/posts": givePosts,
    "/comment/:post": postComment
}, 8080)
```

##License
The MIT License 

Copyright (c) 2012 James A. Eschrich

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR 
OTHER DEALINGS IN THE SOFTWARE.

##API Docs:

###Froyo

Main namespace. Contains all of connect.middleware

###Froyo.app [Function]

returns a new app

###App [Object]

It's an extended version of the connect server. It has the following extra methods:

####App.scoop

Adds request handlers to your app. It can be called at anytime, and the routes are based on [routes](https://github.com/aaronblohowiak/routes.js).

Takes an Object mapping paramter

#####Example

```javascript
app.scoop({
    '/': index,
    '/posts/:post': getPost
})
```

####App.start

Takes a port argument. Starts the app at the port specified.

#####Example

```javascript
app.start(8080)
```

Basically like doing this:

```javascript
http.createServer(app).listen(8080)
```

You can specify an optional 404 request handler (that takes all errors)

```javascript
var map = {
'404': errorRequestHandler
}
```

###Froyo request handlers

Just like node.js request handlers:

```javascript
function(req, res){

}
```
However there are some differences.

* ```req.params.*``` is populated with the field you specified in the url routes.

```javascript
app.scoop({
    '/posts/:post': posts // req.params.post is populated
})
```

* You can also pass objects

```javascript
var index = {
    get: function(req, res){
    ...
    },
    post: function(req, res){
    ...
    }
}
app.scoop({
    '/': index
})
```

If you pass a function, that function is served for GET requests.

```javascript
function index(req, res){
...
}

//and

var index = {
    get: function(req, res){
    ...
    }
}

//are the same thing

//but!
function index(req, res){
...
}

//and

var index = {
    get: function(req, res){
    ...
    },
    post: function(req, res){
    //exact same function
    }
}
//are not the same!
```
* You have the res.render function

```javascript
function index(req, res){
    res.render(file, template, optionsOrConfig)
}
```

Froyo ships with mustache templates by default.

```javascript
function index(req, res){
    res.render("./index.html", "mustache", {name: "Example"})
}
```
###froyo.addTemplate
Adds a template to the template registry for use in ```res.render```. It's a function that get's passed the file string, the http server response, and the template render options.

```javascript
froyo.addTemplate("foo", function(file, res, opts){
    var f = fs.createReadStream(file);
    var fooRender = foo.createRenderStream(opts);
    f.pipe(fooRender);
    fooRender.pipe(f);
});
```

###froyo.getTemplate
Returns the template function registered under the given string.

```javscript
froyo.getTemplate("foo") // returns the foo template function
```

##Developer Guide

###Style Guide

1. If a function returns nothing, it should return a boolean (based on whether the function worked or not) For testing
2. Use streams if possible (for both internals and user experience).
3. The API should be dead simple
4. The API should be expressive and unopinionated
5. The comments should be short but descriptive. Please don't overload comments

###Dependencies
####These are only if you want to work with the code, not use it as a module
1. npm
2. jake (```npm install jake```)

###Work with the code

1. Install (the rest of the) dev dependencies ```jake deps```
2. Install with ```jake install```
3. Test with ```npm test``` or ```mocha```