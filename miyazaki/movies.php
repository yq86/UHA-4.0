    
    <section class="mainMovies">
    
    <?php 
    try {
        $conn = new PDO($cnxbdd, $login, $pwd);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $moviePerPage = 2;
        $totalMovies = ($conn->query("SELECT COUNT(id) FROM movies"))->fetchColumn(); //TODO : if you want to count, use the COUNT statement in SQL // done
        $totalPages = ceil($totalMovies/$moviePerPage);

        if(isset($_GET['pageNum']) && !empty($_GET['pageNum'])){
            $_GET['pageNum'] = intval($_GET['pageNum']);
            $presentPage = $_GET['pageNum'];
        } else {
            $presentPage = 1;
        }
        $startingMovie = ($presentPage-1)*$moviePerPage;

        $movies = $conn->query("SELECT * FROM movies LIMIT ".$startingMovie.",".$moviePerPage); //TODO : This request is useless, you do the same two lines later, if you want to count, use the COUNT statement
        
        if($movies){
            foreach($movies as $movie) { //TODO : be careful to indentation // done
            ?>
            <ul>
                <li class="movieName">
                    <a href="home.php?page=movie&id=<?php echo $movie["id"] ?>"><?php echo $movie["nom_movie"]; ?></a>
                </li>
            
                <li>
                    Year: <?php echo $movie["annee"]; ?>
                </li>    
                
                <li> Type:
                <ul>
                <?php $genres=$conn->query("SELECT * FROM genres
                        INNER JOIN movie_genre mg ON mg.id_genre = genres.id
                        INNER JOIN movies ON mg.id_movie=movies.id
                        WHERE movies.id=".$movie['id']);
                        
                        foreach($genres as $genre){ ?>
                            <li> <?php echo $genre['nom_genre'] ?></li>
                    <?php  } ?>
                        
                    </ul>
                </li>
            
                <li>
                    Note: <?php echo $movie["note"]; ?>
                </li> 

                <li>
                    <img class="movieImg" src="<?php echo $movie["image"] ?>" alt="#">
                </li>
            
                <li>
                    <iframe src="<?php echo $movie["trailer"] ?>" ></iframe>
                </li>
        
                <div>Visite all the <a href="home.php?page=hero&id=<?php echo $movie["id"] ?>">heros</a>from this movie</div>
            
            </ul>
            <?php
            
            } //endforeach
        }  // endif
else { ?>
            <ul>
                <li class="movieName">
                    <?php echo "no movies" ?>
                </li>
                <li class="movieName">
                    <?php echo "please check out heros" ?>
                </li>
            </ul>
<?php    }

        $conn=null;
    }
    catch (PDOException $e) {
        die('Erreur : ' . $e->getMessage());
    }
    
    ?>    
    </section>


   
<?php 
    for($i=1; $i<=$totalPages; $i++){
        if($i == $presentPage){
            echo '<span class="pagination">' .$i. '</span>';
        } else{
            echo '<a class="pagination" href="home.php?page=movies&pageNum='.$i.'">'.$i.'</a>';
        }
    }
?>

