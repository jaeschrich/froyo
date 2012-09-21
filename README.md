Froyo(frozen-yogurt) is a node.js micro framework. It's very simple, but still powerful and expressive. Froyo is public domain, no restrictions. Node.js is licensed with the MIT license

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

jake
```

##API Docs:

##Froyo.scoop
Starts an HTTP server. Takes two arguments ```map``` and ```port```.
###Map 
An object literal where you define your url mapping:

```javascript
var map = {
'/': requestHandler,
'/test': otherRequestHandler
}
```

```requestHandler``` and ```otherRequestHandler``` are function (that take the arguments request and response, like normal nodejs request handler functions).

You can specify an optional 404 request handler (that takes all errors)
```
var map = {
'404': errorRequestHandler
}
```

###Port
The port that the HTTP server listens at.

###Example

```javascript
function index(req, res){
res.writeHead(200, {"Content-Type": "text/plain"})
res.end("Hello World")
}

function err(req, res){
res.writeHead(404, {})
res.end("404")
}

var map = {
'/': index,
'404': err
}
```

##Froyo.staticHandler
Returns a (stream-based) static file serving function. Takes 2 (to three) arguments

Example
```javascript
var map = {
'/': froyos.staticHandler("/myfile.whatever", "text/whatever", jadeTemplateVars)
}
```
###file
The file you want to serve.

###encoding
The MIME type of the file. If it's ```text/jade``` then it will compile the jade to HTML and serve it. You don't need jade installed unless you plan to use it.

###options
The options for the jade rendering. Like:

```json
{
"thing1": 1,
"thing2": 2
}
```
If you aren't using jade, then don't pass options at all.
##Developer Guide
###Style Guide
1. If a function returns nothing, it should return a boolean (based on whether the function worked or not) For testing
2. Use streams if possible (for both internals and user experience)
3. The API should be dead simple
4. The API should be expressive and unopinionated
5. The comments should be short but descriptive. Please don't overload comments

###Dependencies
####These are only if you want to work with the code, not use it as a module
1. Docco (npm install -g docco) Auto-generates documentation
2. Mocha (npm install -g mocha) Does the testing
3. Jake (npm install -g jake) The build system

###Work with the code

1. Install dev dependencies ```jake```
2. Build with ```jake build```
3. Test with ```mocha```
4. Build docs with ```jake docs```

