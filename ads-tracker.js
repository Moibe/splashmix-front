// ads-tracker.js
// Captura y almacena parámetros de URL de Google Ads y otros orígenes

(function() {
  'use strict';

  // Función para obtener parámetros de la URL
  function getURLParams() {
    const params = {};
    const urlParams = new URLSearchParams(window.location.search);
    
    urlParams.forEach((value, key) => {
      params[key] = value;
    });
    
    return params;
  }

  // Función para guardar parámetros en localStorage
  function saveAdsParams(params) {
    if (Object.keys(params).length === 0) return;

    // Guardar en localStorage
    const existingParams = JSON.parse(localStorage.getItem('splashmix_ads_params') || '{}');
    const updatedParams = { ...existingParams, ...params };
    localStorage.setItem('splashmix_ads_params', JSON.stringify(updatedParams));

    // Guardar timestamp de cuando se recibieron
    localStorage.setItem('splashmix_ads_timestamp', new Date().toISOString());

    // También guardar en cookies para acceso entre subdominios
    Object.keys(params).forEach(key => {
      // Configurar cookie con dominio .splashmix.ink para que sea accesible en subdominios
      document.cookie = `splashmix_${key}=${encodeURIComponent(params[key])}; path=/; domain=.splashmix.ink; max-age=${60*60*24*30}`; // 30 días
    });

    console.log('%c📊 Parámetros de Ads capturados y almacenados', 'color: #2196F3; font-weight: bold;');
    console.log('Parámetros:', params);
    console.log('Almacenado en localStorage:', updatedParams);
  }

  // Función para recuperar parámetros almacenados
  window.getSplashmixAdsParams = function() {
    return JSON.parse(localStorage.getItem('splashmix_ads_params') || '{}');
  };

  // Función para recuperar un parámetro específico
  window.getSplashmixAdParam = function(key) {
    const params = window.getSplashmixAdsParams();
    return params[key] || null;
  };

  // Función para limpiar parámetros almacenados
  window.clearSplashmixAdsParams = function() {
    localStorage.removeItem('splashmix_ads_params');
    localStorage.removeItem('splashmix_ads_timestamp');
    console.log('%c🗑️ Parámetros de Ads limpiados', 'color: #FF5722; font-weight: bold;');
  };

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      const params = getURLParams();
      saveAdsParams(params);
    });
  } else {
    const params = getURLParams();
    saveAdsParams(params);
  }

  // Exponer función para verificar parámetros (útil para debug)
  window.showSplashmixAdsParams = function() {
    console.table(window.getSplashmixAdsParams());
    console.log('Timestamp:', localStorage.getItem('splashmix_ads_timestamp'));
  };
})();
