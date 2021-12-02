fetch("https://www.bandsintown.com/a/123?came_from=267",{
    method:"GET",
    headers:{
        "X-Auth-Token": "070843b5d6760df0f070c233e2c0a688",
        "Content-Type": "application/json",

    }
})
    .then(res => res.json())
    .then(data => console.log(data))