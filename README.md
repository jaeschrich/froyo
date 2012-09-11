Frozen Yogurt (froyo.js) is a micro-framework for node.js that I created in a few hours. It's small enough that people probably could memorize and retype the file. It is public domain, no restrictions. Nodejs is licensed with the MIT license

##Install

With npm:
```
npm install git://github.com/PyScripter255/frozen-yogurt.git
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
'/whatever': whateverFunction
}
```
4. Pass the map variable to the function froyo.scoop():

```javascript
froyo.scoop(map, optionalPortVariable)
```
5. Enjoy!

