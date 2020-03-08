<?php
require "connectDB.php";

global $db;

if(isset($_POST['nome']) && !empty($_POST['nome'])) {
   $nome = addslashes($_POST['nome']);
   $comment = addslashes($_POST['comment']);

   if(isset($_FILES['avatar']) && !empty($_FILES['avatar']['tmp_name'])) {
       $ext = array('image/jpeg', 'image/jpg', 'image/png', 'image/gif');

       if(in_array($_FILES['avatar']['type'], $ext)) {

         $avatar = md5(time().rand(0, 999)).'.jpg';

         move_uploaded_file($_FILES['avatar']['tmp_name'], '../sandubao2/img/icons/'.$avatar);

         $sql = "INSERT INTO comments (nome, comment, url) VALUES (:nome, :comment, :url)";
         $sql = $db->prepare($sql);
         $sql->bindValue(":nome", $nome);
         $sql->bindValue(":comment", $comment);
         $sql->bindValue(":url", $avatar);
         $sql->execute();
      }
   }
}

$data = array();
$sql = $db->prepare("SELECT * FROM comments ORDER BY id DESC LIMIT 3");
$sql->execute();

if($sql->rowCount() > 0) {
   $data = $sql->fetchAll();
}
return $data;
