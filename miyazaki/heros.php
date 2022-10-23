<section class="mainHeros">
<?php 
    try {
        $conn = new PDO($cnxbdd, $login, $pwd);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $heroPerPage = 3;
        $totalHeros = $conn->query("SELECT COUNT(id_hero) FROM heros")->fetchColumn(); //TODO : if you want to count, use the COUNT statement in SQL // done
        print_r($totalHeros);
        
        $totalPages = ceil($totalHeros/$heroPerPage);

        if(isset($_GET['pageNum']) && !empty($_GET['pageNum'])){
            $_GET['pageNum'] = intval($_GET['pageNum']);
            $presentPage = $_GET['pageNum'];
        } else {
            $presentPage = 1;
        }
        $startingHero = ($presentPage-1)*$heroPerPage;

    //TODO : This request is useless, you do the same two lines later, if you want to count, use the COUNT statement // done
    $heros = $conn->query("SELECT id_hero, nom_hero, description_hero, role_hero, hero_id, picture 
    FROM heros
    LEFT JOIN heroPictures
    ON heros.id_hero = heroPictures.hero_id LIMIT ".$startingHero.",".$heroPerPage);
    //TODO : don't use * in select // done
    if($heros){ 
    foreach($heros as $hero) { ?>      
        <ul>   
            <li class="heroName">
                <?php echo $hero["nom_hero"];?>
            </li>
            
            <li>
                <img src="<?php echo $hero['picture'] ?>" alt="<?php echo $hero['nom_hero'] ?>">
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
    } else { ?>
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

<?php 
for($i=1; $i<=$totalPages; $i++){
    if($i == $presentPage){
        echo '<span class="pagination">' .$i. '</span>';
    } else{
        echo '<a class="pagination" href="home.php?page=heros&pageNum='.$i.'">'.$i.'</a>';
    }
}
?>