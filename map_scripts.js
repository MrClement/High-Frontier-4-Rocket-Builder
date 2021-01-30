const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -3
});

const bounds = [[0,0], [3520,5322]];
const image = L.imageOverlay('images/map.png', bounds).addTo(map);
map.fitBounds(bounds);


window.onscroll = function() {updateHeader()};

const header = document.querySelector(".header");
const sticky = header.offsetTop;

function updateHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}


function openNav() {
    document.getElementById("dropdown").classList.add("show");
}
  
window.onclick = function(event) {
    if (!event.target.matches('.open-btn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
        }
    }
}
