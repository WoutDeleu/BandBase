
fetch("https://music-news-api.p.rapidapi.com/news/", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "music-news-api.p.rapidapi.com",
        "x-rapidapi-key": "3d01a5558bmsh22e6e0b0f327459p1f4a15jsnc4182e7b8aaf"
    }
})  .then(response => response.json())
    .then(data => {
    let output = '';
    data.forEach(function (object){
        output += `
        <div class="w3-half">
            <h3 class="w3-orangered">${object.title}</h3>
            <p class="w3-text-grey w3-hover-text-white"><a href="${object.url}" target="_blank">${object.url}</a></p>
            <p><dfn>${object.source}</dfn></p>
        </div>
        `;
    });
        document.getElementById('newsOutput').innerHTML = output;
        console.log(data);

    })
    .catch(err => {
        console.error(err);
    });
