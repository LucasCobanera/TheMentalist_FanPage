<?php
/**
 * ==============================================================================
 * CALIFORNIA BUREAU OF INVESTIGATION - DESPACHO DE EXPEDIENTES
 * enviar_expediente.php
 * ==============================================================================
 * Este script procesa el envío del formulario flotante "CBI Dispatch":
 * - Recibe momentos de capítulos propuestos por fans o recomendaciones de la web.
 * - Envía un correo electrónico estructurado al administrador para su evaluación.
 * - Guarda un respaldo de auditoría en expedientes.log.
 * - Responde en formato JSON al frontend (js/cbi-dispatch.js).
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejo de pre-flight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido. Utiliza POST.'
    ]);
    exit;
}

// ------------------------------------------------------------------------------
// 1. CONFIGURACIÓN DEL DESTINATARIO
// ------------------------------------------------------------------------------
// Cambia este correo por tu dirección de correo electrónico personal o corporativa
// donde desees recibir los momentos propuestos para evaluarlos antes de colocarlos:
$destinatario = "tucorreo@ejemplo.com";

// ------------------------------------------------------------------------------
// 2. CAPTURA Y SANITIZACIÓN DE DATOS
// ------------------------------------------------------------------------------
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    $data = $_POST;
}

$tipo          = isset($data['tipo']) ? trim(strip_tags($data['tipo'])) : 'momento';
$nombre        = isset($data['nombre']) ? trim(strip_tags($data['nombre'])) : '';
$email         = isset($data['email']) ? trim(strip_tags($data['email'])) : '';
$descripcion   = isset($data['descripcion']) ? trim(strip_tags($data['descripcion'])) : '';
$temporada     = isset($data['temporada']) ? intval($data['temporada']) : 1;
$capitulo      = isset($data['capitulo']) ? trim(strip_tags($data['capitulo'])) : '';
$tituloMomento = isset($data['titulo_momento']) ? trim(strip_tags($data['titulo_momento'])) : '';
$categoria     = isset($data['categoria']) ? trim(strip_tags($data['categoria'])) : 'general';
$fechaEnvio    = date('Y-m-d H:i:s');
$ipRemitente   = $_SERVER['REMOTE_ADDR'] ?? 'Desconocida';

// Validación básica
if (empty($nombre) || empty($descripcion)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Por favor completa todos los campos requeridos (Nombre y Descripción).'
    ]);
    exit;
}

// ------------------------------------------------------------------------------
// 3. CONSTRUCCIÓN DEL CORREO ELECTRÓNICO
// ------------------------------------------------------------------------------
$dominio = $_SERVER['SERVER_NAME'] ?? 'thementalist-fanpage.local';

if ($tipo === 'moment' || $tipo === 'momento') {
    $asunto = "[CBI Dispatch] Nuevo Momento Propuesto: T{$temporada} - " . ($tituloMomento ?: $capitulo);
    $asuntoCodificado = '=?UTF-8?B?' . base64_encode($asunto) . '?=';

    $cuerpo = "=================================================================\n"
            . "       CALIFORNIA BUREAU OF INVESTIGATION - DESPACHO CBI        \n"
            . "            NUEVO EXPEDIENTE DE MOMENTO FAVORITO                \n"
            . "=================================================================\n\n"
            . "DATOS DEL REMITENTE:\n"
            . "  - Nombre / Alias : $nombre\n"
            . "  - Email          : " . ($email ?: 'No proporcionado') . "\n"
            . "  - Fecha y Hora   : $fechaEnvio\n"
            . "  - IP de Origen   : $ipRemitente\n\n"
            . "DATOS DEL MOMENTO:\n"
            . "  - Temporada      : Temporada $temporada\n"
            . "  - Episodio       : $capitulo\n"
            . "  - Título Escena  : $tituloMomento\n\n"
            . "DESCRIPCIÓN / JUSTIFICACIÓN DE LA ESCENA:\n"
            . "-----------------------------------------------------------------\n"
            . "$descripcion\n"
            . "-----------------------------------------------------------------\n\n"
            . "ESTADO: PENDIENTE DE EVALUACIÓN\n"
            . "Si decides incluir este momento en la página web:\n"
            . "1. Abre el archivo js/cbi-dispatch.js\n"
            . "2. Añade un objeto en la lista DEFAULT_MOMENTS con los datos recibidos.\n"
            . "=================================================================\n";
} else {
    $asunto = "[CBI Dispatch] Nueva Recomendación para la Web de: $nombre";
    $asuntoCodificado = '=?UTF-8?B?' . base64_encode($asunto) . '?=';

    $cuerpo = "=================================================================\n"
            . "       CALIFORNIA BUREAU OF INVESTIGATION - DESPACHO CBI        \n"
            . "            NUEVA RECOMENDACIÓN PARA EL SITIO WEB               \n"
            . "=================================================================\n\n"
            . "DATOS DEL REMITENTE:\n"
            . "  - Nombre / Alias : $nombre\n"
            . "  - Email          : " . ($email ?: 'No proporcionado') . "\n"
            . "  - Fecha y Hora   : $fechaEnvio\n"
            . "  - IP de Origen   : $ipRemitente\n\n"
            . "ÁREA A MEJORAR:\n"
            . "  - Categoría      : $categoria\n\n"
            . "DETALLE DE LA RECOMENDACIÓN:\n"
            . "-----------------------------------------------------------------\n"
            . "$descripcion\n"
            . "-----------------------------------------------------------------\n\n"
            . "=================================================================\n";
}

// Cabeceras MIME
$remitenteNoReply = "no-reply@" . preg_replace('/^www\./', '', $dominio);
$headers = "From: CBI Dispatch <$remitenteNoReply>\r\n";
if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $headers .= "Reply-To: $email\r\n";
}
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// ------------------------------------------------------------------------------
// 4. ENVÍO Y RESPALDO EN LOG
// ------------------------------------------------------------------------------
// Intento de envío por mail() nativo
$mailEnviado = false;
try {
    $mailEnviado = @mail($destinatario, $asuntoCodificado, $cuerpo, $headers);
} catch (Exception $e) {
    $mailEnviado = false;
}

// Respaldo en archivo local de log para auditoría y pruebas locales
$logEntry = "[$fechaEnvio] [$tipo] Remitente: $nombre (" . ($email ?: 'sin email') . ") | ";
if ($tipo === 'moment' || $tipo === 'momento') {
    $logEntry .= "T$temporada - $capitulo - $tituloMomento\n";
} else {
    $logEntry .= "Categoría: $categoria\n";
}
$logEntry .= "Texto: " . str_replace(["\r", "\n"], " ", substr($descripcion, 0, 160)) . "...\n";
$logEntry .= "Mail enviado: " . ($mailEnviado ? "SÍ" : "NO / PENDIENTE SMTP") . "\n";
$logEntry .= "-----------------------------------------------------------------\n";

@file_put_contents(__DIR__ . '/expedientes.log', $logEntry, FILE_APPEND);

// ------------------------------------------------------------------------------
// 5. RESPUESTA AL FRONTEND
// ------------------------------------------------------------------------------
echo json_encode([
    'success'    => true,
    'mail_sent'  => $mailEnviado,
    'type'       => $tipo,
    'message'    => 'Expediente registrado con éxito y remitido para evaluación.'
]);
