const fs = require('fs');
const path = require('path');

// Ruta de la carpeta de imágenes
const imagesDir = path.join(__dirname, 'images');

// Leer archivos de la carpeta
const files = fs.readdirSync(imagesDir);

// Filtrar solo archivos que empiezan con "splashmix"
const splashmixImages = files
    .filter(file => {
        const lowerFile = file.toLowerCase();
        return lowerFile.startsWith('splashmix') && 
               (lowerFile.endsWith('.png') || lowerFile.endsWith('.jpg') || lowerFile.endsWith('.jpeg'));
    })
    .map(file => `images/${file}`)
    .sort();

// Crear objeto JSON
const imagesData = {
    splashmix: splashmixImages
};

// Guardar en images.json
fs.writeFileSync(
    path.join(__dirname, 'images.json'),
    JSON.stringify(imagesData, null, 2)
);

console.log(`✓ Actualizado images.json con ${splashmixImages.length} imágenes splashmix`);
console.log('Imágenes encontradas:');
splashmixImages.forEach(img => console.log(`  - ${img}`));
