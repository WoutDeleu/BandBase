
fetch("https://music-news-api.p.rapidapi.com/news/", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "music-news-api.p.rapidapi.com",
        "x-rapidapi-key": "3d01a5558bmsh22e6e0b0f327459p1f4a15jsnc4182e7b8aaf"
    }
})  .then(response => response.json())
    .then(data => {
    let output = '<h2>News<h2>';
    data.forEach(function (object){
        output += `
        <div>
            <h1>${object.title}</h1>
        </div>
        `;
    });
        document.getElementById('newsOutput').innerHTML = data;
        console.log(data);

    })
    .catch(err => {
        console.error(err);
    });
