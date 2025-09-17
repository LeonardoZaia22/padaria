<?php
include 'db.php';
$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$senha = $data['senha'];

$stmt = $conn->prepare("SELECT * FROM usuarios WHERE email=?");
$stmt->bind_param("s",$email);
$stmt->execute();
$res = $stmt->get_result()->fetch_assoc();

if($res && password_verify($senha,$res['senha'])){
    unset($res['senha']); // não enviar senha
    echo json_encode(["status"=>"ok","usuario"=>$res]);
} else {
    echo json_encode(["status"=>"erro"]);
}
