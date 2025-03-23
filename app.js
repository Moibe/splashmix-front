
firebase.initializeApp(firebaseConfig);
// Provider de Google
const provider = new firebase.auth.GoogleAuthProvider();

// Elementos del DOM
const googleSignInButton = document.getElementById('google-sign-in');
const logoutButton = document.getElementById('logout-button');
const messageDiv = document.getElementById('message');

// Listener para el botón de inicio de sesión con Google
googleSignInButton.addEventListener('click', () => {
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // El usuario ha iniciado sesión correctamente
            const user = result.user;
            messageDiv.textContent = `Bienvenido, ${user.displayName}!`;
            updateUI(user);
        }).catch((error) => {
            // Ocurrió un error
            messageDiv.textContent = `Error al iniciar sesión: ${error.message}`;
        });
});

// Listener para el botón de cierre de sesión
logoutButton.addEventListener('click', () => {
    firebase.auth().signOut()
        .then(() => {
            // El usuario ha cerrado sesión correctamente
            messageDiv.textContent = 'Sesión cerrada.';
            updateUI(null);
        }).catch((error) => {
            // Ocurrió un error
            messageDiv.textContent = `Error al cerrar sesión: ${error.message}`;
        });
});

// Listener para detectar el estado de autenticación
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // El usuario ha iniciado sesión
        updateUI(user);

        // El usuario ha iniciado sesión
        console.log("Usuario autenticado:", user.uid);

        // Redirigir a hola.html
        //window.location.href = "hola.html";
    } else {
        // El usuario ha cerrado sesión o no ha iniciado sesión
        updateUI(null);
    }
});

// Función para actualizar la interfaz de usuario
function updateUI(user) {
    if (user) {
        // Muestra el botón de cierre de sesión y oculta el de inicio de sesión
        googleSignInButton.style.display = 'none';
        logoutButton.style.display = 'block';

        // Muestra un mensaje de bienvenida
        messageDiv.textContent = `Bienvenido, ${user.displayName}!`;
    } else {
        // Muestra el botón de inicio de sesión y oculta el de cierre de sesión
        googleSignInButton.style.display = 'block';
        logoutButton.style.display = 'none';

        // Muestra un mensaje genérico
        messageDiv.textContent = 'Por favor, inicia sesión con Google.';
    }
}
