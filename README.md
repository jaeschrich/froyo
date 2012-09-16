Frozen Yogurt (froyo.js) is a micro-framework for node.js that I created in a few hours. It's small enough that people probably could memorize and retype the file. It is public domain, no restrictions. Nodejs is licensed with the MIT license

##Install

###With npm:
```
npm install git://github.com/PyScripter255/frozen-yogurt.git#npm
```

###Build from source:
Needs Jake

```
git clone git://github.com/PyScripter255/frozen-yogurt.git

cd frozen-yogurt

jake
```

##Usage:

So, to use froyo.js, you need to

1. require the module: 

```javascript
var froyo = require("froyo")
```
2. Define your request handlers as functions. The functions must have only 2 arguments request and response:

```javascript
function main(req, res){
res.writeHead(200, {"Content-Type": "text/html"})
res.write("Hello World!")
res.end()
}
```
3. Define your url mapping as a JSON variable:

```javascript
var map = {
"/": main,
'/whatever': whateverFunction,
'404': four_o_four // You can set an optional 404 handler to replace the built-in one
}
```
4. Pass the map variable to the function froyo.scoop():

```javascript
froyo.scoop(map, optionalPortVariable)
```
5. Enjoy!

##API Docs
See [website](http://pyscripter255.github.com/frozen-yogurt/)

##Developer Guide
###Style Guide
1. If a function returns nothing, it should return a boolean (based on whether the function worked or not) For testing
2. Use streams if possible (for both internals and user experience)
3. The API should be dead simple
4. The API should be expressive and unopinionated
5. The comments should be in plain, normal english (not abbriviated) and in a light, near playful tone
6. The comments that make their way into the auto-generated API docs are on thei own line (or lines) and single line only
7. Those same auto-generated docs are parsed for (normal) mardown
8. In the auto-generated comments, use HTML code blocks, with br tags at the ends of lines (for formatting)

###Dependencies
####These are only if you want to work with the code, not use it as a module
1. Docco (npm install -g docco) Auto-generates documentation
2. Mocha (npm install -g mocha) Does the testing
3. Jake (npm install -g jake) The build system

###Work with the code
1. Build with ```jake```
2. Test with ```mocha``` (You have to run ```jake``` first!)
3. Build docs with ```jake docs```

