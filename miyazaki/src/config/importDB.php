<?php 
include 'src/config/db.php';
//TODO : the name of this file can be modifies : it's all about import DB // done

// create database
function createDB($host,$login, $pwd,$dbName){
    try {
        $conn=new PDO("mysql:host=$host;charset=utf8", $login, $pwd);
        // create database name
        //TODO : you can do all the request in one (separated with ; ) // done
        $conn->query("CREATE DATABASE IF NOT EXISTS $dbName; 
                    USE $dbName;
                    CREATE TABLE IF NOT EXISTS movies (
                        id INT NOT NULL,
                        nom_movie VARCHAR(255) NOT NULL,
                        annee INT,
                        note TEXT,
                        image VARCHAR(255),
                        trailer VARCHAR(255),
                        PRIMARY KEY(id)
                        );
                    CREATE TABLE IF NOT EXISTS heros (
                        id_hero INT NOT NULL AUTO_INCREMENT,
                        nom_hero VARCHAR(255) NOT NULL,
                        film INT NOT NULL,
                        description_hero TEXT,
                        role_hero VARCHAR(255),
                        PRIMARY KEY(id_hero),
                        FOREIGN KEY(film) REFERENCES movies(id)
                        );
                    CREATE TABLE IF NOT EXISTS genres (
                        id INT NOT NULL AUTO_INCREMENT,
                        nom_genre VARCHAR(255) NOT NULL,
                        PRIMARY KEY(id)
                        );
                    CREATE TABLE IF NOT EXISTS movie_genre (  
                        id_movie INT NOT NULL ,
                        id_genre INT NOT NULL,
                        FOREIGN KEY (id_movie) REFERENCES movies(id),
                        FOREIGN KEY (id_genre) REFERENCES genres(id) 
                        );
                    CREATE TABLE IF NOT EXISTS heroPictures (       
                        hero_id INT NOT NULL,
                        picture TEXT,
                        PRIMARY KEY(hero_id),
                        FOREIGN KEY(hero_id) REFERENCES heros(id_hero)
                        );
                    CREATE TABLE IF NOT EXISTS userMessages (  
                        id_message INT NOT NULL AUTO_INCREMENT,
                        id_movie INT NOT NULL,
                        userr_name VARCHAR(255) NOT NULL,
                        user_message TEXT,
                        message_date DATETIME NOT NULL,
                        PRIMARY KEY(id_message),
                        FOREIGN KEY (id_movie) REFERENCES movies(id)
                        )
                    ");
        return $dbName;
    }
    catch(Exception $e)
    {
        die('Error : ' . $e->getMessage());
    }
}




// function to add movies
function addMovies($moviesAPI, $conn){
    foreach($moviesAPI as $movieAPI){
        // mettre dans une variable le tableau reçu de la ligne de l'API
        $id = $movieAPI['id'];
        $nom = htmlspecialchars($movieAPI['nom'], ENT_QUOTES); // tranformation des champs textes pour eviter les erreurs SQL
        $annee = $movieAPI['annee'];
        $note = htmlspecialchars($movieAPI['note'], ENT_QUOTES);
        $image = htmlspecialchars($movieAPI['image'], ENT_QUOTES);
        $trailer = htmlspecialchars($movieAPI['trailer'], ENT_QUOTES);
    
         //TODO : To avoid this verification, use IGNORE statement in your request // done
        $conn->query("INSERT IGNORE INTO movies (id, nom_movie, annee, note, image, trailer) VALUES
        ($id, '$nom', $annee, '$note', '$image', '$trailer')");         
    }
}


//function to add heros
function addHeros($herosAPI, $conn){
foreach($herosAPI as $heroAPI){    
    $nom = htmlspecialchars($heroAPI['nom'], ENT_QUOTES);
    $film = $heroAPI['film'];
    $description = htmlspecialchars($heroAPI['description'], ENT_QUOTES);
    $role = htmlspecialchars($heroAPI['role'], ENT_QUOTES);
     //TODO : To avoid this verification, use IGNORE statement in your request // done
    $conn->query("INSERT IGNORE INTO heros (nom_hero, film, description_hero, role_hero) VALUES('$nom', $film, '$description', '$role')");
    
} 
}


// function to add genres
function addGenres($moviesAPI, $conn){
    foreach($moviesAPI as $movieAPI){
        $genre = $movieAPI['Genre']; // tranformation des champs textes pour eviter les erreurs SQL
          
        for($i=0; $i<count($genre); $i++){                 
            $nom=$genre[$i];    //TODO : To avoid this verification, use IGNORE statement in your request // done
            $conn->query("INSERT IGNORE INTO genres (nom_genre)
            VALUES 
            ('$nom')
            ");
            
        }
    }
}

// function to add movie_genre
function addMovie_Genre($moviesAPI, $conn){
    foreach($moviesAPI as $movieAPI){ //TODO : be careful with indentation // done

        $genre = $movieAPI['Genre']; // tranformation des champs textes pour eviter les erreurs SQL
        
        $mgs=$conn->query("SELECT * FROM movie_genre WHERE id_movie =".$movieAPI['id']);
        $mg = $mgs->fetch();
        if(!$mg){

            for($i=0; $i<count($genre); $i++){                        
                $nom=$genre[$i];   
                $resultGenres=$conn->query("SELECT * FROM genres WHERE nom_genre='$nom'");
                $resultGenre=$resultGenres->fetch();
                /** to insert the table 'movie_genre' */

                $id_genre=$resultGenre['id'];
                $id_movie = $movieAPI['id']; //TODO : To avoid this verification, use IGNORE statement in your request // done
                    $conn->query("INSERT IGNORE INTO movie_genre (id_movie, id_genre) VALUES
                ($id_movie, $id_genre)
                    ");
            
            }         
        }
    }
}
// function to add heroPictures
function addHeroPictures($cnxbdd,$login,$pwd){
    try {
        $conn=new PDO($cnxbdd, $login, $pwd);
        $conn->query("INSERT INTO heroPictures (hero_id, picture) VALUES
        (1, 'https://pbs.twimg.com/profile_images/1264665600909021191/MJlUrS4V.jpg'),
        (2, 'https://photo.cosplayfu.com/character/mini/7558_287833.jpg'),
        (3, 'https://cdn.shopify.com/s/files/1/0248/9110/products/totoro_sur_son_arbre.jpg?v=1488814825'),
        (4, 'https://i.pinimg.com/originals/d6/9e/2e/d69e2eebd285267f0de9950c3e006441.jpg'),
        (5, 'https://cdn.anisearch.fr/images/character/cover/full/40/40226.webp'),
        (6, 'https://i.pinimg.com/originals/86/24/59/8624594be940e2f723072cf1b991737f.gif'),
        (7, 'https://i.pinimg.com/originals/17/c9/4e/17c94e080507c3491501f31c3f60d62b.jpg'),
        (8, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY_Y9SvtfgTgqLT6qpC3x2ahp3CAa-JSMSJg&usqp=CAU'),
        (9, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhuDYbljpovQ-GweWuEcTU03xq-23g4NuhVQ&usqp=CAU')
        ");
    
    }
    catch(Exception $e)
    {
        die('Error : ' . $e->getMessage());
    }
}

// function to change trailer link
function changeTrailerLink($conn){//TODO : Not useful  // done
    $conn->query('UPDATE movies SET trailer = REPLACE(trailer, "watch?v=", "embed/") ');   
}



// call all the inserting functions in one function
function insertTables($cnxbdd, $login, $pwd){
    try {
        $arrContextOptions=array(
            "ssl"=>array(
                "verify_peer"=>false,
                "verify_peer_name"=>false,
            ),
        );

        $moviesAPI = json_decode(file_get_contents("https://filrouge.uha4point0.fr/Miyasaki/films",false, stream_context_create($arrContextOptions)), true);
        $herosAPI = json_decode(file_get_contents("https://filrouge.uha4point0.fr/Miyasaki/heros",false, stream_context_create($arrContextOptions)), true);

    //$moviesAPI = json_decode(file_get_contents("http://10.3.1.172:2222/Miyasaki/films"), true);
    //$herosAPI = json_decode(file_get_contents("http://10.3.1.172:2222/Miyasaki/heros"), true);
        $conn = new PDO($cnxbdd, $login, $pwd);   
         // call the function to add insert into the tables
        addMovies($moviesAPI,$conn);
        addHeros($herosAPI,$conn); 
        addGenres($moviesAPI, $conn);
        addMovie_Genre($moviesAPI, $conn);
        addHeroPictures($cnxbdd,$login,$pwd);
        changeTrailerLink($conn);
        $conn = null;
    }
    catch(Exception $e)
    {
        die('Error : ' . $e->getMessage());
    }
    
}//TODO : be careful to indentation // done


// function to reset database
function deleteDB($connMadm,$login,$pwd,$dbName){
    try {   
        $conn = new PDO($connMadm, $login, $pwd);
        $conn->query("DROP DATABASE $dbName");
        $conn = null;
    }
    catch(Exception $e)
    {
        die('Error : ' . $e->getMessage());
    }
}  

function addDB($login, $pwd, $host, $dbName,$cnxbdd){
    try {     
        createDB($host,$login, $pwd,$dbName);
        insertTables($cnxbdd, $login, $pwd);   
    }
    catch(Exception $e)
    {
        die('Error : ' . $e->getMessage());
    }
}

?>

                                                                 