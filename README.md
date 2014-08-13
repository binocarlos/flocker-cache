## flocker-cache

An in-memory cache for flocker that routes requests to /images/create onto the same server as the previous /containers/create request

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

// the flockercache will remember routing decisions for images
dockers.on('route', flockercache(function(info, done){
	customRoutingLogic(info, done)
}))

dockers.on('map', function(name, container, image, next){
	next()
})

dockers.on('list', function(next){
	next(null, serverList)
})

var server = http.createServer(function(req, res){
	dockers.handle(req, res)	
})

server.listen(80)
```

the cache will keep state between subsequent /containers/create and /images/create requests and route them to the correct address

## license

MIT