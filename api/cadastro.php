<?php
include 'db.php';
$data = json_decode(file_get_contents("php://input"), true);

$nome  = $data['nome'];
$tel   = $data['telefone'];
$email = $data['email'];
$senha = password_hash($data['senha'], PASSWORD_DEFAULT);
$rua   = $data['rua'];
$num   = $data['numero'];
$comp  = $data['complemento'];
$cep   = $data['cep'];

$stmt = $conn->prepare("INSERT INTO usuarios
 (nome, telefone, email, senha, rua, numero, complemento, cep)
 VALUES (?,?,?,?,?,?,?,?)");
$stmt->bind_param("ssssssss",$nome,$tel,$email,$senha,$rua,$num,$comp,$cep);

echo $stmt->execute()
     ? json_encode(["status"=>"ok"])
     : json_encode(["status"=>"erro","msg"=>$conn->error]);

