let card_data;

fetch("flat_card_data.json")
  .then(response => response.json())
  .then(json => {
      card_data = json;
      create_cards().then(() => {
        update_view("thruster");
      })
      
  });

function create_cards() {
    return new Promise(function (resolve, reject) {
        for(c in card_data) {
            create_card(c.id, c.id.split("_")[0], `images/${c.front.image}`, `images/${c.back.image}`);
        }
        resolve();
    });
}

function update_view(search) {
    let target_ids = [];
    target_ids = card_data.
    document.querySelectorAll('.card').forEach(el => {
        if(target_ids.indexOf(el.id) >= 0) {
            el.style.display = "block";
        } else {
            el.style.display = "none";
        }
    })
}

function create_card(id, type, front, back) {
    let new_card = document.createElement('div');
    let front_img = document.createElement('img');
    front_img.src = front;
    front_img.width = "250";
    front_img.classList.add("f");
    let back_img = document.createElement('img');
    back_img.style.display = "none";
    back_img.width = "250"
    back_img.classList.add("b");
    back_img.src = back;
    new_card.appendChild(front_img);
    new_card.appendChild(back_img);
    new_card.classList.add("card");
    new_card.classList.add("front");
    new_card.classList.add(type);
    new_card.id = id;
    new_card.style.display = "none";
    document.querySelector('#card-finder').appendChild(new_card);
}

document.addEventListener('keydown', function (e) {
    
    if(e.key === "Alt" || e.key === "f") {
        let target = document.querySelector( ".card:hover");
        let f_card = document.querySelector("#floating_card");
        if(target) {
            f_card.style.top = "" + (window.innerHeight * .2 + window.scrollY) + "px";
            let img_target = document.querySelector("#floating_card_img");
            img_target.src = target.querySelector("img.f").src;
            f_card.style.display = "flex";
            document.getElementById("overlay").style.display = "block";
        } else {
            f_card.style.display = "flex";
            document.getElementById("overlay").style.display = "block";
        }
    }
    if(e.key === "Shift" || e.key === "b") {
        document.getElementById("overlay").style.backgroundColor = "rgba(255,255,255,0.7)";
        let img_target = document.querySelector("#floating_card_img");
        img_target.src = img_target.src.replace("front", "back");
        document.querySelectorAll(".f").forEach(el => {
            el.style.display = "none";
        });
        document.querySelectorAll(".b").forEach(el => {
            el.style.display = "block";
        });
    }
})

document.addEventListener('keyup', function (e) {
    if(e.key === "Alt" || e.key === "f") {
        let f_card = document.querySelector("#floating_card");
        f_card.style.display = "none"
        document.getElementById("overlay").style.display = "none";
    }
    if(e.key === "Shift" || e.key === "b") {
        document.getElementById("overlay").style.backgroundColor = "rgba(0,0,0,0.7)";
        let img_target = document.querySelector("#floating_card_img");
        img_target.src = img_target.src.replace("back", "front");
        document.querySelectorAll(".b").forEach(el => {
            el.style.display = "none";
        });
        document.querySelectorAll(".f").forEach(el => {
            el.style.display = "block";
        });
    }
});

document.querySelectorAll(".card-type").forEach((n) => n.addEventListener('change', function (e) {
    types = [];
    document.querySelectorAll(".card-type").forEach(n => {
        if(n.checked) {
            types.push(n.id.split("-")[0]);
        }
    });
    update_view(types);
}));



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