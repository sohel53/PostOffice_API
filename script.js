const getLocationBtn = document.getElementById("get-btn");
const mapDiv = document.getElementById("map");

if(navigator.geolocation) {
    getLocationBtn.addEventListener("click", getLocation)    
}
else {
    alert("Getlocation is not supported by your browser");
}

function getLocation(){
    navigator.geolocation.getCurrentPosition(showPosition);
}

window.addEventListener('load', () => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        document.getElementById('ip-address').textContent = data.ip;
    });

    const ipAddress = document.getElementById('ip-address').textContent;
    fetch(`https://ipinfo.io/${ipAddress}/geo`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('city').textContent = data.city;
    });
});

function showPosition(position){
    const lat = position.coords.latitude;
	const long = position.coords.longitude;

    localStorage.setItem("lat", lat)
    localStorage.setItem("long", long)

    const myURL =  `https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed`;
    mapDiv.innerHTML = `<iframe height= "400", width="100%", frameborder = "1" src= "${myURL}"></iframe>`;
    
}


