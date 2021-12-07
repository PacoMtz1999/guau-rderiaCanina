//Nombre y version del cache
const CACHE_NAME = 'v1_cache_GC',
    urlsToCache = [
        './',
        'https://fonts.googleapis.com/css?family=Raleway:400,700',
        'https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwJYtWqZPAA.woff2',
        'https://use.fontawesome.com/releases/v5.0.7/css/all.css',
        'https://use.fontawesome.com/releases/v5.0.6/webfonts/fa-brands-400.woff2',
        'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Noto+Sans+JP&display=swap',
        './script.js',
        './index.js',
        './indexSponsor.js',
        '../css/style.css',
        '../img/images/eduardoContreras.png',
        '../img/images/faedCamacho.png',
        '../img/images/fondoCard.png',
        '../img/images/Logo.jpeg',
        '../img/images/logoBayer.png',
        '../img/images/logoGobMich.png',
        '../img/images/logoGuaurderiaCanina.png',
        '../img/images/logoPedigree.png',
        '../img/images/logoPetco.png',
        '../img/images/marcoEstrada.png',
        '../img/images/mision.png',
        '../img/images/pacoMartinez.png',
        '../img/images/vision.png',
        '../img/images/mantenimiento2019.gif',
    ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => self.skipWaiting())
            })
            .catch(err => console.log('Falló registro de cache', err))
    )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        //Eliminamos lo que ya no se necesita en cache
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName)
                        }
                    })
                )
            })
            // Le indica al SW activar el cache actual
            .then(() => self.clients.claim())
    )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
    //Responder ya sea con el objeto en caché o continuar y buscar la url real
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    //recuperar del cache
                    return res
                }
                //recuperar de la petición a la url
                return fetch(e.request)
            })
    )
})