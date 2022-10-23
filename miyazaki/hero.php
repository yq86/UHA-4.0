<section class="mainHeros">   
<?php 
    try {
        $conn = new PDO($cnxbdd, $login, $pwd);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   
    $heros = $conn->query("SELECT * 
    FROM heros
    LEFT JOIN heroPictures
    ON heros.id_hero = heroPictures.hero_id WHERE film=".$id);
    if($heros){ ?>
        <?php
        //TODO : why are you doing two times the same request ? // bug fixed
        foreach($heros as $hero) {
            ?>               
            <ul>                  
                <li class="heroName">
                    <?php echo $hero["nom_hero"];?>
                </li>

                <li>
                   <img src="<?php echo $hero['picture'] ?>" alt="">
               </li>
                
                <li>
                    <?php echo $hero["description"]; ?>
                </li>
                
                <li>
                    <?php echo $hero["role"]; ?>
                </li>
            </ul>
            
            <?php
            }

        $conn=null;
    } 
    else{
        ?>
            <ul style="height:150px">  
                <li class="heroName">
                    <?php echo "No heros" ?>
                </li>
                <li>
                    <?php echo "Please check out movies" ?>
                </li>
            </ul>

<?php
    }
    }
    catch (PDOException $e) {
            die('Erreur : ' . $e->getMessage());
    }

?>      
</section>  