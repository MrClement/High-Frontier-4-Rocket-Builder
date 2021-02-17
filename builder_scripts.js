let card_data;


fetch("flat_card_data.json")
  .then(response => response.json())
  .then(json => {
      card_data = json;
      create_cards().then(() => {
        document.querySelectorAll(".in-list").forEach((n) => n.addEventListener('click', addCardToBuild));
        update_view({type: "all"});
      })
      
  });

function create_cards() {
    return new Promise(function (resolve, reject) {
        for(c of card_data) {
            create_card(c.id, c.id.split("_")[0], `images/${c.front.image}`, `images/${c.back.image}`);
        }
        resolve();
    });
}

function update_view(search) {
    let target_ids = [];
    for(c of card_data) {
        let include = true;
        if(search.type !== "all" && c.type !== search.type) {
            include = false;
        }
        if(include) target_ids.push(c.id);
    }
    document.querySelectorAll('.card').forEach(el => {
        if(target_ids.indexOf(el.id) >= 0 && [...el.classList].indexOf('in-list') >=0) {
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
    front_img.style.display = "block";
    front_img.classList.add("f");
    let back_img = document.createElement('img');
    back_img.style.display = "none";
    back_img.classList.add("b");
    back_img.src = back;
    new_card.appendChild(front_img);
    new_card.appendChild(back_img);
    new_card.classList.add("card");
    new_card.classList.add("front");
    new_card.classList.add("in-list");
    new_card.classList.add(type);
    new_card.id = id;
    new_card.style.display = "none";
    document.querySelector('#card-list').appendChild(new_card);
}

document.addEventListener('keydown', function (e) {
    
    if(e.key === "Alt" || e.key === "f") {
        let target = document.querySelector( ".card:hover");
        let f_card = document.querySelector("#floating_card");
        if(target) {
            f_card.style.top = "" + (window.innerHeight * .2 + window.scrollY) + "px";
            let img_target = document.querySelector("#floating_card_img");
            img_target.src = target.querySelector('img[style*="display: block;"]').src;
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

function addCardToBuild (e) {
    let card = e.target.parentElement;
    if([...card.classList].indexOf('in-list') >= 0) {
        document.querySelector("#card-list").removeChild(card);
        card.classList.remove('in-list');
        document.querySelector("#rocket").appendChild(card);
        card.classList.add('draggable');
        card.querySelectorAll('img').forEach((x) => x.style.height = "100%");
        addButtons(card);
    }
}

function removeCardFromBuild (e) {
    let card = e.target.parentElement.parentElement;
    if([...card.classList].indexOf('draggable') >= 0) {
        document.querySelector("#rocket").removeChild(card);
        card.classList.add('in-list');
        document.querySelector("#card-list").appendChild(card);
    }
    card.classList.remove('draggable');
    card.querySelectorAll('img').forEach((x) => x.style.height = "");
    removeButtons(card);
}

function addButtons(card) {
    let buttonContainer = document.createElement("div");
    let flip = document.createElement("button");
    flip.innerHTML = "↶";
    flip.style.width = "30px";
    flip.style.paddingLeft = "0px;";
    flip.addEventListener('click', flipCard);
    let remove = document.createElement("button");
    remove.innerHTML = "🗑";
    remove.style.width = "30px";
    remove.style.paddingLeft = "0px;";
    remove.addEventListener('click', removeCardFromBuild);
    buttonContainer.style.height = "80px";
    buttonContainer.style.width = "40px";
    buttonContainer.style.position = "relative";
    buttonContainer.style.top = "85px";
    buttonContainer.style.left = "5px";
    buttonContainer.appendChild(flip);
    buttonContainer.appendChild(remove);
    buttonContainer.classList.add("card-buttons")
    card.prepend(buttonContainer);
} 

function removeButtons(card) {
    card.removeChild(card.querySelector('.card-buttons'));
} 


function flipCard(e) {
    let card = e.target.parentElement.parentElement;
    card.querySelectorAll('img').forEach((x) => {
        if(x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    });
}


document.querySelector("#part-type").addEventListener('change', function(e) {
    update_view({type: e.target.value});
});

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

const mass = document.getElementById('mass');

noUiSlider.create(mass, {
    start: [0, 12],
    connect: true,
    tooltips: [{
        to: function (value) {
            return Math.floor(value);
    }}, {
        to: function (value) {
            return Math.floor(value);
    }}],
    step: 1,
    range: {
        'min': 0,
        'max': 12
    }
});

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
  
function dragMoveListener (event) {
    var target = event.target,
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.webkitTransform =
    target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

interact('.draggable')
  .draggable({
    onmove: window.dragMoveListener
  })
  .resizable({
    edges: { left: true, right: true, bottom: true, top: true }
  })
  .on('resizemove', function (event) {
    var target = event.target;
    x = (parseFloat(target.getAttribute('data-x')) || 0),
    y = (parseFloat(target.getAttribute('data-y')) || 0);

    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
});

document.querySelector("#save").addEventListener('click', function (e) {
    let rocket_cards = document.querySelectorAll('#rocket > .draggable');
    let save_data = {};
    for(card of rocket_cards) {
        save_data[card.id] = card.style.cssText;
    }
    document.cookie = `save_data=${btoa(JSON.stringify(save_data))}`;
})

document.querySelector("#load").addEventListener('click', function (e) {
    let stored_data = document.cookie.replace("save_data=", "")
    let save_data = JSON.parse(atob(stored_data));
});

