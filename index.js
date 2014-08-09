
var stash = {}
// we need to route a container onto a single server
dockers.on('allocate', function(info, next){
	if(info.container){
		if(stash['container/' + info.name]){
			var address = stash['container/' + info.name]
			delete stash['container/' + info.name]
			return next(null, address)
		}
		// use container info to decide which server to route to
		chooseServer(name, container, function(err, address){
			if(err) return next(err)

			// we can change the container on the way through
			container['property'] = ''

			stash['image/' + container.Image] = address
			stash['container/' + name] = address

			setTimeout(function(){
				delete stash['image/' + container.Image]
				delete stash['container/' + name]
			},5*60*1000)
			
			// address is 127.0.0.1:2375 style string
			next(null, address)
		})
	}
	else if(info.image){
		if(stash['image/' + info.image]){
			var address = stash['image/' + info.image]
			delete stash['image/' + info.image]
			return next(null, address)
		}
		else{
			return next('no image stash found')
		}
	}
	
})
