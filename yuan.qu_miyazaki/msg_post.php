
<?php session_start(); 

include 'src/config/db.php'; 

//TODO : is this file usefull ? I don't find any include with it // it is true, it is useless, it is replaced by js 
    try {
        $conn = new PDO($cnxbdd, $login, $pwd);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        if($_SERVER['REQUEST_METHOD']=='POST'){
            if(!empty($_POST['sureName'])&& !empty($_POST['message'])){
          
            $id_movie = $_SESSION["movie"]["id"];
            $name = $_POST['sureName'];
            $message = $_POST['message'];
            $date = date('Y/m/d H:i:s');

            $conn->query("INSERT INTO userMessages(id_movie, userr_name, user_message, message_date)VALUES('$id_movie', '$name', '$message', '$date')");
            } 
        }
        $conn=null;
    }
    catch (PDOException $e) {
        die('Erreur : ' . $e->getMessage());
    }

    header('Location: home.php?page=movie&id='.$_SESSION["movie"]["id"]); 
    ?> 
    
   