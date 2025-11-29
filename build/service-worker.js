self.addEventListener("install", event => {
  console.log("Service Worker: Installed");
  event.waitUntil(
    caches.open("savemate-cache").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.webmanifest",
        "/logo192.png", // your app logo
        "/logo512.png"  // for install screen
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});