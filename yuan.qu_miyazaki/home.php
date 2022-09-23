<?php 
include 'src/inc/headerHome.php'; 
include 'src/config/db.php'; 
include 'src/config/importDB.php'; 

if(isset($_GET['page'])){ $page=$_GET['page'];}else{$page="movies";}
if(isset($_GET['id'])){ $id=$_GET['id'];}else{$id=0;}
switch($page) {
    case "movies":
        include("movies.php");
        break;
    case "heros":
        include("heros.php");
        break;
    case "hero":
        include("hero.php");
        break;
    case "movie":
        include("movie.php"); 
        break;
    case "delete":
        deleteDB($connMadm,$login,$pwd,$dbName);
        header('Location: index.php');
        break;   
    default: 
        header('Location: home.php?page=movies');
        break;
}

include 'src/inc/footer.php'; 
?>