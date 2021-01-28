let card_data;

fetch("card_data.json")
  .then(response => response.json())
  .then(json => {
      card_data = json;
      create_cards().then(() => {
        update_view(["thruster"]);
      })
      
  });

function create_cards() {
    return new Promise(function (resolve, reject) {
        let cards = {};
        Object.keys(card_data).forEach((type) => {
            Object.assign(cards, card_data[type])
        });
        for(key in cards) {
            let c = cards[key];
            create_card(key, key.split("_")[0], `images/${c.front.image}`, `images/${c.back.image}`);
        }
        resolve();
    });
}

function update_view(types) {
    document.querySelectorAll('.card').forEach(el => {
        if([...el.classList].filter(x => types.includes(x)).length > 0) {
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
    document.querySelector('#card-display').appendChild(new_card);
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
            types.push(n.name);
        }
    });
    update_view(types);
}));

document.querySelectorAll( ":hover" );