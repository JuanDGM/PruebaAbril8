
importScripts('js/app-utils.js');

const CACHE_STATIC = 'static-v1';
const CACHE_DYNAMIC = 'dynamic-v1';
const CACHE_INMUTABLE = 'inmutable-v1';

const app_shel_static = [
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/spiderman.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/wolverine.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/hulk.jpg',
    'js/app.js',
    'js/app-utils.js',
    'manifest.json'
];

const app_shel_inmutable = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js'
];

self.addEventListener('install',e=>{
    
   const resCacheStatic =  caches.open(CACHE_STATIC).then(cache=>{
       cache.addAll(app_shel_static);
    });
    
   const resCacheInmutable = caches.open(CACHE_INMUTABLE).then(cache=>{
        cache.addAll(app_shel_inmutable);
   }); 
    
   e.waitUntil( Promise.all([resCacheStatic, resCacheInmutable]) ); 
   
});


self.addEventListener('activate',e=>{
    
   const res =  caches.keys().then(keys=>{
        keys.forEach(key=>{
            if(key!==CACHE_STATIC && key.includes('static')){
                caches.delete(key);
            }
        });
    });
    e.waitUntil(res);
});


self.addEventListener('fetch',e=>{
    
//    Estrategia: Cache with network fallback
    
  const respuesta = caches.match(e.request).then(res=>{
        
        if(res){
                return res;
        }else{
                console.log('error',e.request.url);
            return fetch(e.request).then(newRes=>{
                    guardarCacheDynamico(e.request,CACHE_DYNAMIC,newRes);
            return newRes.clone();
            });
        }
    });
  e.respondWith(respuesta);
});



