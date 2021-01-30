var extent = [0, 0, 5232, 3520];
var projection = new ol.proj.Projection({
  code: 'local_image',
  units: 'pixels',
  extent: extent,
});

var map = new ol.Map({
  controls: [],
  target: 'map',
  view: new ol.View({
      projection: projection,
      center: ol.extent.getCenter(extent),
      zoom: 3,
  }),
});

var im_layer = new ol.layer.Image({
  source: new ol.source.ImageStatic({
      url: 'images/map.png',  
      projection: projection,
      imageExtent: extent
  })
})
map.addLayer(im_layer)


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
