<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

// Configuración de errores
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Archivo de log para depuración
$logFile = 'registro.log';

try {
    // Obtener datos de entrada
    $input = file_get_contents('php://input');
    
    // Intentar decodificar como JSON primero
    $data = json_decode($input, true);
    
    // Si no es JSON válido, usar $_POST
    if ($data === null && !empty($_POST)) {
        $data = $_POST;
    }

    // Validar datos básicos
    if (empty($data)) {
        throw new Exception("No se recibieron datos");
    }

    // Validar campos requeridos
    $required = ['nombres', 'apellidos', 'fecha', 'correo', 'usuario', 'password'];
    $missing = array_diff($required, array_keys($data));
    
    if (!empty($missing)) {
        throw new Exception("Faltan campos obligatorios: " . implode(', ', $missing));
    }

    // Sanitizar y validar datos
    $nombres = htmlspecialchars(trim($data['nombres']));
    $apellidos = htmlspecialchars(trim($data['apellidos']));
    $correo = filter_var(trim($data['correo']), FILTER_SANITIZE_EMAIL);
    $usuario = htmlspecialchars(trim($data['usuario']));
    $password = trim($data['password']);
    $fecha = trim($data['fecha']);

    // Validación de fecha (formato DD/MM/AAAA)
    if (!preg_match('/^(\d{2})\/(\d{2})\/(\d{4})$/', $fecha, $matches)) {
        throw new Exception("Formato de fecha inválido. Use DD/MM/AAAA");
    }
    
    list(, $dia, $mes, $anio) = $matches;
    if (!checkdate($mes, $dia, $anio)) {
        throw new Exception("Fecha no válida");
    }
    $fecha_mysql = "$anio-$mes-$dia";

    // Validación de email
    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Correo electrónico no válido");
    }

    // Configuración de conexión a base de datos
    $servername = "localhost";
    $username = "root";
    $password_db = "12345"; // Cambiado el nombre para evitar conflicto con la variable $password
    $dbname = "aaron";

    // Conectar a la base de datos
    $conn = new mysqli($servername, $username, $password_db, $dbname);
    
    if ($conn->connect_error) {
        throw new Exception("Error de conexión a la base de datos: " . $conn->connect_error);
    }

    // Verificar si la tabla usuarios existe
    $table_check = $conn->query("SHOW TABLES LIKE 'usuarios'");
    if ($table_check->num_rows == 0) {
        throw new Exception("La tabla 'usuarios' no existe en la base de datos");
    }

    // Verificar si usuario/correo ya existen
    $check = $conn->prepare("SELECT id FROM usuarios WHERE usuario = ? OR correo = ?");
    $check->bind_param("ss", $usuario, $correo);
    $check->execute();
    
    if ($check->get_result()->num_rows > 0) {
        throw new Exception("El usuario o correo ya está registrado");
    }
    $check->close();

    // Hash de contraseña
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    if ($password_hash === false) {
        throw new Exception("Error al cifrar la contraseña");
    }

    // Insertar nuevo usuario
    $insert = $conn->prepare("INSERT INTO usuarios (nombres, apellidos, fecha_nacimiento, correo, usuario, password) VALUES (?, ?, ?, ?, ?, ?)");
    $insert->bind_param("ssssss", $nombres, $apellidos, $fecha_mysql, $correo, $usuario, $password_hash);
    
    if ($insert->execute()) {
        $response = [
            'success' => true,
            'message' => "¡Registro exitoso! Serás redirigido al login en 3 segundos.",
            'user_id' => $conn->insert_id,
            'redirect' => '../login/login.html',
            'redirect_delay' => 3000 // 3 segundos en milisegundos
        ];
    } else {
        throw new Exception("Error al registrar usuario: " . $insert->error);
    }
    
    $insert->close();
    $conn->close();

    echo json_encode($response);

} catch (Exception $e) {
    // Registrar error en el archivo de log
    error_log("[" . date('Y-m-d H:i:s') . "] ERROR: " . $e->getMessage() . "\n", 3, $logFile);
    
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>