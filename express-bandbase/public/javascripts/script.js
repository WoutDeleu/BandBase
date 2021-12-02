
fetch("https://music-news-api.p.rapidapi.com/news/nytimes", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "music-news-api.p.rapidapi.com",
        "x-rapidapi-key": "3d01a5558bmsh22e6e0b0f327459p1f4a15jsnc4182e7b8aaf"
    }
})  .then(response => response.json())
    .then(response => {
        console.log(response);

    })
    .catch(err => {
        console.error(err);
    });
