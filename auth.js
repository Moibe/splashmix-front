//Conexión con Firebase
firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();

// Elementos del DOM
const googleSignInButtons = document.getElementsByClassName('boton_firebase');
const messageDivs = document.getElementsByClassName('mensaje_firebase');
const logoutButton = document.getElementById('logout-button');

// Listener para el botón de inicio de sesión con Google
Array.from(googleSignInButtons).forEach(button => {
button.addEventListener('click', () => {
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            updateUI(user);
            redirige(user);            
        }).catch((error) => {
            console.log(`Error al iniciar sesión: ${error.message}`);
        });
})
});

//Listener para el botón de cierre de sesión
logoutButton.addEventListener('click', () => {
    firebase.auth().signOut()
        .then(() => {
            // El usuario ha cerrado sesión correctamente
            console.log('Sesión cerrada.');
            updateUI(null);
        }).catch((error) => {
            // Ocurrió un error
           console.log(`Error al cerrar sesión: ${error.message}`);
        });
});

// Listener para detectar el estado de autenticación
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // El usuario ha iniciado sesión
        updateUI(user);
    } else {
        // El usuario ha cerrado sesión o no ha iniciado sesión
        updateUI(null);
    }
});

// Función para actualizar la interfaz de usuario
function updateUI(user) {
    if (user) {
        console.log("updateUI, actualizando...")
        // messageDiv.textContent = ``;
        // googleSignInButton.innerText = 
        
        for (const message of messageDivs) {
            message.innerText = "";
          }


        for (const button of googleSignInButtons) {
            button.innerText = "Ir a la APP 👉🏻";
          }
        
        // logoutButton.style.display = 'block';

        // Muestra un mensaje de bienvenida
        // messageDiv.textContent = `Bienvenido, ${user.displayName}!`;
       
    } else {
        // Muestra el botón de inicio de sesión y oculta el de cierre de sesión
        for (const message of messageDivs) {
            message.innerText = "¡Prúebalo con tu foto ya mismo!";
          }


        for (const button of googleSignInButtons) {
            button.innerText = "Conecta con Google";
          }
    }
}

function redirige(user) {
    user.getIdToken().then((authToken) => {
      // Redirigir a app.splashmix.ink con el token como parámetro
      window.location.href = `http://127.0.0.1:7800?authToken=${authToken}`;
    }).catch((error) => {
      console.log(`Error al obtener el token: ${error.message}`);
      // Manejar el error al obtener el token (por ejemplo, redirigir sin token)
      window.location.href = "https://app.splashmix.ink";
    });
  }