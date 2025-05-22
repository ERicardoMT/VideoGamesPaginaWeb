<?php
// Iniciar sesión y configurar headers
session_start();
header('Content-Type: application/json');

// Headers CORS para desarrollo (ajustar en producción)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Obtener datos del POST y sanitizarlos
$user = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
$pass = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

// Validación de campos vacíos
if (empty($user) || empty($pass)) {
    http_response_code(400); // Bad Request
    echo json_encode([
        'success' => false, 
        'message' => 'Usuario y contraseña son requeridos'
    ]);
    exit;
}

// Configuración de la base de datos (ajustar según tu entorno)
$host = 'localhost';
$dbname = 'aaron';
$dbUser = 'root';
$dbPass = '12345';

try {
    // Conexión a la base de datos
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $dbUser, $dbPass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

    // Consulta para obtener el usuario
    $stmt = $conn->prepare("SELECT id, usuario, password FROM usuarios WHERE usuario = :usuario LIMIT 1");
    $stmt->bindParam(':usuario', $user, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->rowCount() === 1) {
        $userData = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verificar contraseña
        if (password_verify($pass, $userData['password'])) {
            // Configurar sesión
            $_SESSION['user_id'] = $userData['id'];
            $_SESSION['username'] = $userData['usuario'];
            $_SESSION['loggedin'] = true;
            
            // Regenerar ID de sesión para seguridad
            session_regenerate_id(true);

            // Respuesta exitosa
            echo json_encode([
                'success' => true, 
                'redirect' => '../principal/principal.php' // Ajustar ruta según necesidad
            ]);
            exit;
        }
    }

    // Credenciales incorrectas
    http_response_code(401); // Unauthorized
    echo json_encode([
        'success' => false, 
        'message' => 'Usuario o contraseña incorrectos'
    ]);
    
} catch(PDOException $e) {
    // Error de base de datos
    http_response_code(500); // Internal Server Error
    error_log('Error en login.php: ' . $e->getMessage()); // Registrar error
    echo json_encode([
        'success' => false, 
        'message' => 'Error en el servidor. Por favor, inténtelo más tarde.'
    ]);
}
?>