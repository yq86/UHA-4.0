// to send new comments to API and show the last comment

const form = document.getElementById('addPost');

form.addEventListener("submit", (event)=>{
    event.preventDefault();

    let id_movie = document.getElementById('id_movie').innerHTML.trim();
    let userr_name = document.getElementById('userr_name').value;
    let user_message = document.getElementById('user_message').value;

    fetch('src/api/test.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json'
        },
        body:JSON.stringify({id_movie:id_movie, userr_name:userr_name, user_message:user_message})
    })
    .then(response => response.json())
    .then(json => {
        document.forms['frm'].reset(); 
        let comment = json[0];
        let messages = document.getElementById('messages');
        let newHTML = "<div><li><strong>"+ comment.userr_name +"</strong>"+ comment.message_date +"</li>  <li>"+ comment.user_message +"</li></div>";
        messages.insertAdjacentHTML("afterbegin", newHTML);
    })
    .catch((error) => {
        console.error('Error:', error);                   
        })
})

// to creat tags for new comments
function createTags(comment){
    let messages = document.getElementById('messages');
    let newHTML = "<div><li><strong>"+ comment.userr_name +"</strong>"+ comment.message_date +"</li>  <li>"+ comment.user_message +"</li></div>";
    messages.innerHTML+=newHTML;
}


let current_page = 2; 

let idmovie = document.getElementById('id_movie').innerHTML.trim();

// to show more comments
function moreComents()
{   
    let page = current_page++; 
 //   console.log(page); 
 // this first result is the same as of the original variable current_page, that is why I need to give it a original value 2, instead of 1, weird
    !async function(){        
        let objJson = await 
        fetch('src/api/test.php?idmovie='+idmovie+'&page='+page)
        .then(response=>response.json())
        .then(data=> {return data;});
        
        for (let i = 0; i < objJson.length; i++) {
            createTags(objJson[i]);
            }  
    }();
}


// to show the first page(the last 3 comments)
function firstPageComments(page)
{   
 !async function(){ 
    let objJson = await 
    fetch('src/api/test.php?idmovie='+idmovie+'&page='+page)
    .then(response=>response.json())
    .then(data=> {return data;})
    
    for (let i = 0; i < objJson.length; i++) {
        createTags(objJson[i]);
        }   
}();

}

// each time when the page is refreshed, only first page(the last 3 comments) is shown. 
window.onload = function() {
    firstPageComments(1);
};
