function searchArtist(){
    const artist = document.getElementById("artistInput").value.trim();
    const url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=070843b5d6760df0f070c233e2c0a688`;
    document.getElementById('bandsInTown').value="Fetching ...";
    fetch(url,{"method": "GET",})
        .then(response => response.json())
        .then( data =>{
            let output = ''
            output += `
                <h1>${artist}</h1>
            `
            data.forEach(function (object){
                output +=`
                <button class="accordion">${object.venue.location} / ${object.datetime}</button>
                 <div class ="panel">
                    <p>testing</p>
                 </div>
                
            
`
                })

            document.getElementById("bandsInTown").innerHTML = output;
            })



}

