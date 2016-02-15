<?php
if(isset($_POST['field1']) && isset($_POST['field2']) && isset($_POST['field4'])) {
    $data =PHP_EOL . $_POST['field1'] . "	" . $_POST['field2'] . "	" . $_POST['field4'] . PHP_EOL ;
    $ret = file_put_contents('email.txt', $data, FILE_APPEND | LOCK_EX);
    if($ret === false) {
        die('There was an error writing this file');
    }
    else {
         header('Location: https://sbimochan.github.io'); 
    }
}
else {
   die('no post data to process');
   
  

}