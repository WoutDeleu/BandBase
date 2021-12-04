function searchArtist(){
    const artist = document.getElementById("artistInput").value.trim();
    const url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=070843b5d6760df0f070c233e2c0a688`;
    document.getElementById('bandsInTown').value="Fetching ...";
    fetch(url,{"method": "GET",})
        .then(response => response.json())
        .then( data =>{
            let output = ''
            data.forEach(function (object){
                output +=`
                    <ul>
                       <li>${object.lineup}</li>
                    </ul>  
            `
                })
            document.getElementById("bandsInTown").innerHTML = output;
            })


}






fetch("", {
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


        `;
        })
        document.getElementById('bandsInTown').innerHTML = output;
        console.log(output);
    });
