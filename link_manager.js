// link_manager.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtiene el dominio actual de la página
    const currentDomain = window.location.hostname;

    // 2. Define la URL base de la aplicación según el dominio
    let appBaseUrl;
    if (currentDomain.includes('targetvox.com')) {
        appBaseUrl = 'https://app.targetvox.com';
    } else { // Si no es targetvox.com, asume splashmix.ink
        appBaseUrl = 'https://app.splashmix.ink';
    }

    // 3. Define la URL completa con el query parameter
    const fullAppUrl = `${appBaseUrl}/login`;
    //const buyUrl = `${appBaseUrl}/buy`;

    // 4. Actualiza los enlaces del 'Ir a la APP' usando la clase para seleccionar a todos
    const appButtons = document.querySelectorAll('.boton_principal');
    appButtons.forEach(button => {
        button.href = fullAppUrl;
    });

    // 5. Actualiza el enlace 'splashmix.ink 🐙' si tiene la clase correcta
    const splashmixLink = document.querySelector('.boton_navbar');
    if (splashmixLink) {
        splashmixLink.href = fullAppUrl;
    }
});