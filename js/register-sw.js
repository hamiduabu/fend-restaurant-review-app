// Register service worker
(() => {
  if (!navigator.serviceWorker) return;
  navigator.serviceWorker.register('/sw.js').catch(error => {
    console.log(error);
  });
})();
