const API_KEY = "e14afe4f4edf497183784fc9a8a8586d";
const url = "https://newsapi.org/v2/everything?q=";



// !=======================> FOR FETCHING NEWS <========================!


window.addEventListener("load", () =>{
spinner.style.display = "auto"

fetchNews("India")});

async function  fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data =  await res.json();
    bindData(data.articles);
}







// !============================> WE DON'T WANT TO SHOW THOES NEWS  IN WHICH NEWS IMAGE IS NULL <===============!





function bindData(articles){
    const cardContainer = document.getElementById("card-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardContainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);

        fillDataInCard(cardClone, article);

        cardContainer.appendChild(cardClone);
    });
}



// !=====================> FILLING OF CONTENTS ON ALL CARDS <=========================!



function fillDataInCard(cardClone , article){
    const newsImg = cardClone.querySelector("#news-Img");
    const newsTile = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTile.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/jakarta"});

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url, "_blank");
    })
}



// !========================> FOR SELECTION OF NAV CONTENT <=================================!


let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    spinner.style.display = "auto";
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
    spinner.style.display = "auto";
}




// !======================> FOR SEARCH BTN AND TO REMOVE SELECTED NAV CONTENT<======================!


const searchBtn = document.getElementById("search-btn");
const searchTxt = document.getElementById("search-txt");

searchBtn.addEventListener("click", ()=>{
        spinner.style.display = "auto";
    const query = searchTxt.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
    spinner.style.display = "auto";
})



// !==================> ON CLICKING LOGO THE PAGE SHOULD BE RELOAD <======================!




function reload (){
    window.location.reload();
}



// !============================> FOR SPINNER <===========================!

const spinner = document.getElementById("spinner");

 window.addEventListener("load", ()=>{
        spinner.style.display = "auto";
    })

