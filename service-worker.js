const CACHE_NAME = "keuzemachine-pro-v1";

const BESTANDEN = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json"
];


// Installeren

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)
    .then(cache => {

      return cache.addAll(BESTANDEN);

    })

  );

});



// Offline ophalen

self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)
    .then(response => {

      return response || fetch(event.request);

    })

  );

});
