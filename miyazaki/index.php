<?php 
include 'src/inc/headerINDEX.php'; 
include 'src/config/db.php';
include 'src/config/importDB.php'; 

//TODO : When I’m on this page and that datas are already loaded, I have the button telling me to load the movies // I didnt see this problem,  the button here is the button to create database
if(isset($_GET['page'])){    
    if($_GET['page']="add"){
        addDB($login, $pwd, $host, $dbName,$cnxbdd);       
        header('Location: home.php?page=movies');
    }
}

?> 

   <section class="miyazaki">
        <div class="trans">
            <div class="title">宮崎駿</div>
            <div class="info">
                （みやざき はやお、1941年〈昭和16年〉1月5日 - ）は、日本の映画監督、アニメーター、漫画家。別名として秋津 三朗（あきつ さぶろう）、照樹 務（てれこむ）がある。宮﨑 駿と表記されることもある。株式会社スタジオジブリ取締役、公益財団法人徳間記念アニメーション文化財団理事長、三鷹市立アニメーション美術館（三鷹の森ジブリ美術館）館主。
                <br>
                <br>
                東京府東京市出身。学習院大学政経学部卒業。1963年に東映動画にアニメーターとして入社。その後いくつかの会社を経てフリーとなり、その間にテレビアニメ『未来少年コナン』、初の劇場用アニメ『ルパン三世 カリオストロの城』で頭角を現した。1984年に個人事務所の二馬力を設立し、翌年に高畑勲らとアニメーション制作会社スタジオジブリの設立に参加（2005年に同社取締役に就任）。以後『となりのトトロ』『魔女の宅急便』『もののけ姫』などの劇場用アニメーションを監督し、『千と千尋の神隠し』でベルリン国際映画祭金熊賞とアカデミー長編アニメ映画賞を受賞した。2014年には日本人で2人目のアカデミー名誉賞を受賞した。埼玉県所沢市在住[2]。 
                <br>
                <br>
                初めてウィキメディア・コモンズにこられた方には、最初に秀逸な画像と良質な画像、価値ある画像をご覧になることをお勧めします。これらにはコミュニティのメンバーにより選出された、特に優れた画像が集められています。
                <br>
                <br>
                また、優れた画像を多く提供している私達の写真家と私達のイラストレーターによる画像も同時にご覧になるとよいでしょう。ピクチャーオブザイヤー（年間画像大賞）もよかったらご覧ください。 
                <br>
                <br>
                まずは再利用ガイドをお読みください。フリーライセンスに関する利用条件・注意事項を確認できます。また、あなたが必要な画像をリクエストすることもできます。
                <br>
                <br>
                もし被写体が同定されていないファイルの中にあなたが知っているものが写っていたら、その名前や周辺情報をファイルの説明文、カテゴリ、トークページなどに書いてください。
            </div>
        </div>
    </section>
    <?php include 'src/inc/footer.php'; ?> 