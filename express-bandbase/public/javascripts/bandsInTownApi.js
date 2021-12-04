fetch("https://rest.bandsintown.com/artists/Sabaton/events?app_id=070843b5d6760df0f070c233e2c0a688", {
    "method": "GET",

})
    .then(response => response.json())
    .then(data => {
        let output = '';
        data.forEach(function (object){
            output +=`
            <ul>
                <li>${object.lineup}</li>
            </ul>           


`
        })
        document.getElementById('bandsInTown').innerHTML = output;
        console.log(output);
    })
