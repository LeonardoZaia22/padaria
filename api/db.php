<?php
$host = "localhost";
$user = "root";
$pass = "";       // coloque a senha do MySQL se houver
$db   = "padaria";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}
$conn->set_charset("utf8mb4");
?>
