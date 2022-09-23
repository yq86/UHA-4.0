<?php session_start(); ?>
<section class="mainMovies">  
    <?php 
    try {
        $conn = new PDO($cnxbdd, $login, $pwd);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);      
        $movie=$conn->query("SELECT * FROM movies WHERE id=".$id)->fetch();

    ?>
        <ul>
            <li id="id_movie" style="display:none">
                <?php echo $movie["id"]; ?>
            </li>
            <li class="movieName">
                <?php echo $movie["nom_movie"]; ?>
            </li>
        
            <li>
                Year: <?php echo $movie["annee"]; ?>
            </li>    
            
            <li> Type:
                <!-- TODO : a list in a list ??? // yes it looks nice-->
            <ul >
            <?php
                //TODO : you could do one request with a join inside (get the movie and the genres in one request) // it gives 3 rows and finnally it doesn't show correctly, so I keep it my original way
                $genres=$conn->query("SELECT * FROM genres
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
                        
            <form name="frm" id="addPost"  method="post">
                <ul>
                    <li>
                        <label for="sureName">user name</label> <input type="text" name="sureName" id="userr_name" required/>
                    </li>

                    <li>
                        <label for="message">Message</label> <textarea type="text" name="message" id="user_message" required></textarea>
                    </li>

                    <li>
                        <input type="submit" value="Envoyer" />
                    </li>
                </ul>
            </form>
                    
            <div id="messages" >

            </div>
            <button onclick="moreComents();" >more comments</button>
           
            

                        
           
            
     
<!---show comments by php from database---->      
            <?php /*    foreach ($conn->query("SELECT * FROM userMessages WHERE id_movie=$id ORDER BY message_date DESC LIMIT 0,10" ) as $userMessage): ?>           
                    <li class="userMessage">
                        <strong> <?php echo htmlspecialchars($userMessage['userr_name']) ?> </strong>   <?php echo $userMessage['message_date'] ?> <br/>
                        <?php echo htmlspecialchars($userMessage['user_message']) ?>
                    </li>           
                <?php endforeach */?>  

        </ul>

        <?php $_SESSION["movie"] = $movie; ?>
        
    <?php

       

        $conn=null;
    }
    catch (PDOException $e) {
        die('Erreur : ' . $e->getMessage());
    }
    
    ?>    
    </section>   

    <script type="text/javascript" src="src/api/api.js">

</script>