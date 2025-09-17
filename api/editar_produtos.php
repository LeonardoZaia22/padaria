<?php
include 'db.php';
$data = json_decode(file_get_contents("php://input"), true);

foreach($data as $p){
    $stmt = $conn->prepare(
      "UPDATE produtos SET nome=?, preco=?, descricao=? WHERE id=?");
    $stmt->bind_param("sdsi", $p['nome'],$p['preco'],$p['descricao'],$p['id']);
    $stmt->execute();
}
echo json_encode(["status"=>"ok"]);
