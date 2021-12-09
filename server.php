<?php
$_POST = json_decode(file_get_contents("php://input"), true);///убрать, если отправлять данные в формате formData
echo var_dump($_POST);