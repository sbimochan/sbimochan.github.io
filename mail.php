<?php
$name = $_POST['name'];
$email = $_POST['email'];

$message = $_POST['message'];
$formcontent=" From: $name \n Email: $email \n Message: $message";
$recipient = "bmochan@gmail.com";
$subject = "Message from website";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");

?>
