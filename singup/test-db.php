<?php
header('Content-Type: text/plain');

// Configuración de conexión (usa los mismos valores que en registro.php)
$servername = "localhost";
$username = "root";
$password = "12345";
$dbname = "aaron";

try {
    // 1. Probar conexión a MySQL
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        throw new Exception("Error de conexión: " . $conn->connect_error);
    }
    echo "1. Conexión a MySQL: OK\n";
    
    // 2. Verificar si existe la tabla
    $result = $conn->query("SHOW TABLES LIKE 'usuarios'");
    if ($result->num_rows == 0) {
        throw new Exception("La tabla 'usuarios' no existe");
    }
    echo "2. Tabla 'usuarios': EXISTE\n";
    
    // 3. Verificar estructura de la tabla
    $columns = [
        'id', 'nombres', 'apellidos', 'fecha_nacimiento', 
        'correo', 'usuario', 'password', 'fecha_registro'
    ];
    
    $result = $conn->query("DESCRIBE usuarios");
    $foundColumns = [];
    while ($row = $result->fetch_assoc()) {
        $foundColumns[] = $row['Field'];
    }
    
    $missing = array_diff($columns, $foundColumns);
    if (!empty($missing)) {
        throw new Exception("Faltan columnas: " . implode(', ', $missing));
    }
    echo "3. Estructura de tabla: COMPLETA\n";
    
    // 4. Probar inserción de prueba
    $testData = [
        'nombres' => 'Test',
        'apellidos' => 'User',
        'fecha_nacimiento' => date('Y-m-d'),
        'correo' => 'test@test.com',
        'usuario' => 'testuser',
        'password' => password_hash('testpass', PASSWORD_DEFAULT)
    ];
    
    $insert = $conn->prepare("INSERT INTO usuarios (nombres, apellidos, fecha_nacimiento, correo, usuario, password) VALUES (?, ?, ?, ?, ?, ?)");
    $insert->bind_param("ssssss", 
        $testData['nombres'],
        $testData['apellidos'],
        $testData['fecha_nacimiento'],
        $testData['correo'],
        $testData['usuario'],
        $testData['password']
    );
    
    if ($insert->execute()) {
        echo "4. Inserción de prueba: EXITOSA (ID: " . $conn->insert_id . ")\n";
        // Limpiar el registro de prueba
        $conn->query("DELETE FROM usuarios WHERE id = " . $conn->insert_id);
    } else {
        throw new Exception("Error en inserción: " . $insert->error);
    }
    
    $conn->close();
    
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    exit(1);
}

echo "TODAS LAS PRUEBAS PASARON CORRECTAMENTE\n";
?>