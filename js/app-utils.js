

function guardarCacheDynamico(req,cacheD,NRes){
    caches.open(cacheD).then(cache=>{
                    cache.put(req,NRes);
                });
}

