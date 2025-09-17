<?php
include 'db.php';
$res = $conn->query("SELECT * FROM produtos");
echo json_encode($res->fetch_all(MYSQLI_ASSOC));
