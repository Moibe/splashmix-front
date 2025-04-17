self.addEventListener('install', event => {
    console.log('Service Worker installed for main');
    // Perform installation steps if needed
});

self.addEventListener('activate', event => {
    console.log('Service Worker activated for main');
    // Clean up old caches, etc.
});

self.addEventListener('fetch', event => {
    // The Service Worker can intercept network requests here
    // For the postMessage communication, the fetch event is generally not relevant
    // unless the iframe or the parent are making HTTP requests as part of the auth flow.
    // You might log the requests for debugging.
    // console.log('Fetch request intercepted in main SW:', event.request.url);
    // event.respondWith(fetch(event.request)); // Default behavior: pass through the request
});

self.addEventListener('message', event => {
    console.log('Message received by main SW:', event.data);
    // If you want the Service Worker to handle the postMessage, you would do it here.
    // For this specific iframe communication, it's likely the window itself is handling it.
    // If the iframe were making fetch requests to the main domain, the SW could intercept those.
});