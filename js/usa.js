const usaBtn = document.getElementById("usa");
const newsDetail = document.getElementById("newsDetail");

var newsDataArr = [];

const API_KEY = "76646ac460794ef69acf3bba25c1c60f";
const USA_NEWS = "https://newsapi.org/v2/top-headlines?country=us&apiKey=";

const fetchUsaNews = async () => {
    const response = await fetch(USA_NEWS + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsDetail.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayNews();
}

function displayNews() {
    newsDetail.innerHTML = "";

    if (newsDataArr.length == 0) {
        newsDetail.innerHTML = "<h5> No data found <h5>"
        return;
    }

    newsDataArr.forEach(news => {

        var date = news.publishedAt.split("T");
        
        var col = document.createElement('div');
        col.className="news-container";
        

        var card = document.createElement('div');
        card.className = "news-box";

        var imageLink = document.createElement('a');
        imageLink.className = "imageLink"
        imageLink.setAttribute("href", news.url);
        imageLink.setAttribute("target", "_blank");

        var image = document.createElement('img');
        image.className = "image"
        image.setAttribute("height","70%");
        image.setAttribute("width","70%");
        image.src = news.urlToImage;
        imageLink.appendChild(image);

        var cardBody = document.createElement('div');
        cardBody.className='card-body';
        
        var dateHeading = document.createElement('h5');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];
        
        var newsHeading = document.createElement('a');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;
        newsHeading.setAttribute("target", "_blank");
        newsHeading.href = news.url;
        
        var description = document.createElement('p');
        description.className="text-muted";
        description.innerHTML = news.description;
        

        var link = document.createElement('a');
        link.className="btn";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="Read more";

        cardBody.appendChild(dateHeading);
        cardBody.appendChild(newsHeading);
        
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(imageLink);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsDetail.appendChild(col);
    });
}

// Add these lines at the end of your script
fetchUsaNews();