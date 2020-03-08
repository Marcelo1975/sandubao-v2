<?php
// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];
	
// Create the email and send the message
$to = 'sandubaoitapecerica@gmail.com';
$email_subject = "Website Contact Form:  $name";
$email_body = "Você recebeu uma nova mensagem do formulário de contato do seu site.\N\n "." Aqui estão os detalhes:\n\nNome: $name\n\nEmail: $email_address\n\nMessagem:\n$message";
$headers = "From: noreply@sandubaoitapecerica.com.br\n"; 
$headers .= "Reply-To: $email_address";	
mail($to,$email_subject,$email_body,$headers);
return true;			
?>