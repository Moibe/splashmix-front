// In splashmix.ink/auth-helper.html
console.log("Entré en authhelper.... ")
firebase.auth().onAuthStateChanged(function(user) {
    window.addEventListener('message', function(event) {
      if (event.origin === 'https://app.splashmix.ink' && event.data === 'auth-check-request') {
        if (user) {
          user.getIdToken().then(function(token) {
            window.parent.postMessage({ type: 'auth-token', token: token }, 'https://app.splashmix.ink');
          }).catch(function(error) {
            window.parent.postMessage({ type: 'auth-error', error: error.message }, 'https://app.splashmix.ink');
          });
        } else {
          window.parent.postMessage({ type: 'auth-status', authenticated: false }, 'https://app.splashmix.ink');
        }
      }
    }, false);
  });
  
  // Send a handshake request to the parent window when loaded
  window.parent.postMessage('auth-helper-loaded', 'https://app.splashmix.ink');