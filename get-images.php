<?php
header('Content-Type: application/json');

$imagesDir = __DIR__ . '/images/';
$splashmixImages = [];

if (is_dir($imagesDir)) {
    $files = scandir($imagesDir);
    foreach ($files as $file) {
        // Verificar si el archivo comienza con "splashmix"
        if (strpos($file, 'splashmix') === 0 && (strpos($file, '.png') !== false || strpos($file, '.jpg') !== false || strpos($file, '.jpeg') !== false)) {
            $splashmixImages[] = 'images/' . $file;
        }
    }
}

echo json_encode(['splashmix' => $splashmixImages]);
?>
