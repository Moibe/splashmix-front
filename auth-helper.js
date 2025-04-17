// In splashmix.ink/auth-helper.html
console.log("Entré en authhelper.... ")

//Conexión con Firebase
firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();



firebase.auth().onAuthStateChanged(function(user) {
    window.addEventListener('message', function(event) {
      if (event.origin === 'https://app.splashmix.ink' && event.data === 'auth-check-request') {
        console.log("Entré al primer IF.")
        if (user) {
          user.getIdToken().then(function(token) {
            console.log("Entré al primer IF anidado...")
            window.parent.postMessage({ type: 'auth-token', token: token }, 'https://app.splashmix.ink');
          }).catch(function(error) {
            console.log("Entré al catch...")
            window.parent.postMessage({ type: 'auth-error', error: error.message }, 'https://app.splashmix.ink');
          });
        } else {
          console.log("Entré al else...")
          window.parent.postMessage({ type: 'auth-status', authenticated: false }, 'https://app.splashmix.ink');
        }
      }
    }, false);
  });
  
  // Send a handshake request to the parent window when loaded
  window.parent.postMessage('auth-helper-loaded', 'https://app.splashmix.ink');