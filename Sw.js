const CACHE_NOMBRE = "antkeeper-cache-v1";

const ARCHIVOS_CACHE = [
    "./",
    "index.html",
    "App.js",
    "Style.css",
    "Manifest.json",
    "Data/Especies.js",
    "Js/Storage.js",
    "Js/Graficas.js",
    "Js/Inicio.js",
    "Js/Colonias.js",
    "Js/Colonia.js",
    "Js/Cuidados.js",
    "Js/Configuracion.js",
    "Js/Fotos.js",
    "Js/Diario.js",
    "Js/FormularioColonia.js",
    "Js/Revisiones.js",
    "Js/Ajustes.js"
];


self.addEventListener("install", (evento) => {

    self.skipWaiting();

    evento.waitUntil(
        caches.open(CACHE_NOMBRE)
        .then((cache) => cache.addAll(ARCHIVOS_CACHE))
    );

});


self.addEventListener("activate", (evento) => {

    evento.waitUntil(
        caches.keys()
        .then((nombres) => {

            return Promise.all(
                nombres
                .filter((nombre) => nombre !== CACHE_NOMBRE)
                .map((nombre) => caches.delete(nombre))
            );

        })
        .then(() => self.clients.claim())
    );

});


self.addEventListener("fetch", (evento) => {

    evento.respondWith(

        fetch(evento.request)
        .then((respuesta) => {

            const copia = respuesta.clone();

            caches.open(CACHE_NOMBRE)
            .then((cache) => cache.put(evento.request, copia));

            return respuesta;

        })
        .catch(() => {

            return caches.match(evento.request);

        })

    );

});