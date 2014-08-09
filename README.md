## flocker-cache

An in memory flocker cache to handle multi-request docker run commands

## install

```
$ npm install flocker-cache
```

## usage

```js
var http = require('http')
var flocker = require("flocker")
var flockercache = require("flocker-cache")

var dockers = flocker()
var backends = flockercache(function(name, container, done){
	customRoutingLogic(name, container, done)
})

dockers.on('route', backends)

dockers.on('list', function(next){
	next(null, serverList)
})

dockers.on('process', function(container, image, done){
	done()
})

var server = http.createServer(function(req, res){
	dockers.handle(req, res)	
})

server.listen(80)
```

the cache will keep state between subsequent /containers/create and /images/create requests and route them to the correct address

## license

MIT