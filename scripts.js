let card_data;

fetch("card_data.json")
  .then(response => response.json())
  .then(json => {
      card_data = json;
      update_view(["thruster"]);
  });


function update_view(types) {
    document.querySelector('#card-display').innerHTML = ""
    let cards = {}
    types.forEach((type) => {
        Object.assign(cards, card_data[type])
    });
    for(key in cards) {
        let c = cards[key];
        create_card(key, `images/${c.front.image}`, `images/${c.back.image}`);
    }
}

function create_card(id, front, back) {
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
    new_card.id = id;
    document.querySelector('#card-display').appendChild(new_card);
}

document.addEventListener('keydown', function (e) {
    
    if(e.key === "Alt") {
        let target = document.querySelector( ".card:hover");
        if(target) {
            let f_card = document.querySelector("#floating_card");
            f_card.style.top = "" + (window.innerHeight * .2 + window.scrollY) + "px";
            let img_target = document.querySelector("#floating_card_img");
            img_target.src = target.querySelector("img.f").src;
            f_card.style.display = "flex";
            document.getElementById("overlay").style.display = "block";
        }
    }
    if(e.key === "Shift") {
        let img_target = document.querySelector("#floating_card_img");
        img_target.src = img_target.src.replace("front", "back");
    }
})

document.addEventListener('keyup', function (e) {
    if(e.key === "Alt") {
        let f_card = document.querySelector("#floating_card");
        f_card.style.display = "none"
        document.getElementById("overlay").style.display = "none";
    }
    if(e.key === "Shift") {
        let img_target = document.querySelector("#floating_card_img");
        img_target.src = img_target.src.replace("back", "front");
    }
});

document.querySelectorAll(".card-type").forEach((n) => n.addEventListener('change', function (e) {
    types = [];
    document.querySelectorAll(".card-type").forEach(n => {
        if(n.checked) {
            types.push(n.name);
        }
    });
    update_view(types);
}));

document.querySelectorAll( ":hover" );