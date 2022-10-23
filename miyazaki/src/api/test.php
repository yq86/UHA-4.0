<?php
require("../config/db.php");
$var = file_get_contents('php://input', true);  
$conn = new PDO($cnxbdd, $login, $pwd); //TODO : ! indentation ! // done
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        
        if(!empty($_GET['idmovie'])) {
            $idmovie = $_GET['idmovie'];
            if(!empty($_GET['page'])){
                $page = $_GET['page'];
                getDetailmovie($conn, $idmovie, $page);
            }                     
        } else if(!empty($_GET['username'])) {
            $username = $_GET['username'];
            getDetailuser($conn, $username);
        } else if(!empty($_GET['page'])) {
            $page = $_GET['page'];
            getPage($conn, $page);
        } 
        else  {
            getDetails($conn);
        }
        break;
    case 'POST':
        if(isset($_POST) && $_SERVER['REQUEST_METHOD'] == 'POST' ){
            setDetails($conn, $var);
        }
        break;
    case 'PUT' :
        if(!empty($_GET['idmessage'])) {
            $idmessage = $_GET['idmessage'];
            putDetails($conn, $var);
        }
        break;
    case 'DELETE':
        if(!empty($_GET['idmessage'])) {
            $idmessage = $_GET['idmessage'];
            deleteDetails($conn, $idmessage);
        }
        break;
    default:
        echo "Methode non reconnue";
    break;
}

function getDetails($conn) {
    //TODO : limit the request // done
    $APIs = $conn->query("SELECT userr_name, user_message, message_date FROM userMessages ORDER BY message_date DESC");
    $API = $APIs->fetchAll(PDO::FETCH_ASSOC);
    //TODO : those two line are in almost all the functions, you can factorise them // I find it easier to understand this way
    header('Content-Type: application/json');
    echo json_encode($API, JSON_NUMERIC_CHECK | JSON_PRETTY_PRINT);
}

function getDetailmovie($conn, $idmovie, $page) {
    if($page < 1) { 
        $page=1; 
    }
    $offset = ($page-1)*3;
    $APIs = $conn->query("SELECT * 
                        FROM userMessages                            
                        WHERE id_movie = $idmovie ORDER BY message_date DESC
                        LIMIT 3 OFFSET $offset");
    $API = $APIs->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json');
    echo json_encode($API, JSON_NUMERIC_CHECK | JSON_PRETTY_PRINT);
}

function getDetailuser($conn, $username) {
    $APIs = $conn->query("SELECT * 
                            FROM userMessages
                            WHERE userr_name = '$username'");
    $API = $APIs->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json');
    echo json_encode($API, JSON_NUMERIC_CHECK | JSON_PRETTY_PRINT);
}
function getPage($conn, $page) {
    if($page < 1) { 
        $page=1; 
    }
    $offset = ($page-1)*3;
    $APIs = $conn->query("SELECT * 
                            FROM userMessages
                            LIMIT 3 OFFSET $offset");
    $API = $APIs->fetchAll(PDO::FETCH_ASSOC);
    if(!$API){
        $info = "no comments yet";
        echo json_encode($info, JSON_NUMERIC_CHECK | JSON_PRETTY_PRINT);
    } else {
        header('Content-Type: application/json');
        echo json_encode($API, JSON_NUMERIC_CHECK | JSON_PRETTY_PRINT);
    }
        
}
function setDetails($conn, $var) {  
   $tab = json_decode($var);
    $id_movie = $tab->{'id_movie'};
    $userr_name = $tab->{'userr_name'};
    $user_message = $tab->{'user_message'};
    $message_date = date('Y/m/d H:i:s');
    //TODO : be careful to escape variables in order to protect the request and the datas in your DB // it doesnt work without being variables
    $API = $conn->query("INSERT INTO userMessages(id_movie, userr_name, user_message, message_date)
     VALUES('$id_movie','$userr_name', '$user_message', '$message_date')");
     getDetails($conn);
}


function putDetails($conn, $var) {
    $tab = json_decode($var);
    //TODO : be careful to escape variables in order to protect the request and the datas in your DB // it works only being this way...if it is a bug, I couldnt fix it
    $id_message= $tab->{'id_message'};
    $id_movie = $tab->{'id_movie'};
    $userr_name = $tab->{'userr_name'};
    $user_message = $tab->{'user_message'};
    $message_date = date('Y/m/d H:i:s');
    $API = $conn->query("UPDATE userMessages 
        SET 
        id_movie  = '$id_movie',
        userr_name = '$userr_name',
        user_message = '$user_message',
        message_date = '$message_date'
        WHERE 
        id_message = $id_message");
    header('Content-Type: application/json');
    echo json_encode($API, JSON_NUMERIC_CHECK | JSON_PRETTY_PRINT);
}

function deleteDetails($conn, $idmessage) {
    $API = $conn->query("DELETE FROM userMessages WHERE id_message=$idmessage");
    header('Content-Type: application/json');
    echo json_encode($API, JSON_NUMERIC_CHECK | JSON_PRETTY_PRINT);
}

?>
