

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
                const ticketUrl = object.offers.map(o => o.url);

                output +=`
                <button class="accordion"> > ${object.venue.location} / ${object.datetime}</button>
                <div class ="panel w3-black.w3-opacity" >
                <h5>Line up:</h5> <br> 
                   ${object.lineup}
                    <hr>
                <h5>LINKS:</h5> <br> 
                <ul>
                    <li><a href="${ticketUrl}"> Tickets</a></li>                   
                    <li><a href="${object.url}">Link their concert</a></li>
                </ul>
                </div>        
`
                })
            document.getElementById("bandsInTown").innerHTML = output;
            accordion();
            })
}
function accordion(){
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
}

