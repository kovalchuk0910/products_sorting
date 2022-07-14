let check = document.querySelectorAll('.check');
let products = document.querySelector('.products');
let acceptBtn = document.querySelector('.acceptBtn');
let cancelBtn = document.querySelector('.cancelBtn');
let game = document.querySelectorAll('.game');
let saleBlock = document.querySelector('.saleBlock');
let registerBlock = document.querySelector('.registerBlock');

let productsArr = [];

getProducts();

async function getProducts() {
    try {
        const result = await fetch('https://run.mocky.io/v3/f68c2884-f846-4f29-95aa-ed62192945e1')
            .then(response => {
                return response.json();
            });

        drawProducts(result);
        productsArr = result;
        console.log(result);
    } catch(e) {
        console.log('Error', e);
    }
}

function drawProducts(productsArr) {
    let storage = JSON.parse(localStorage.getItem('user'));
    products.innerHTML = '';
    if(storage) {
        registerBlock.innerHTML = '';
        registerBlock.innerHTML += `
            <div class="loggedBlock">
                <p class="logged">Ваш логин: ${storage.login}</p>
                <button class="logoutBtn" onclick="logout()"> Выйти </button>
            </div>

        `;
        saleBlock.classList.add('hide');
        productsArr.forEach(item => {
            products.innerHTML += `
            <div class="game">
                <img src="${item.img}">
                <div>
                    <p class="price oldPrice">${item.price}$</p>
                    <p class="price newPrice">${item.salePrice}$</p>
                    <button class="buyBtn">Купить</button>
                </div>
            </div>
            `
        })
    } else {
        productsArr.forEach(item => {
            products.innerHTML += `
            <div class="game">
                <img src="${item.img}">
                <div>
                    <p class="price">${item.price}$</p>
                    <button class="buyBtn">Купить</button>
                </div>
            </div>
            `
        })
    }
    
}

function logout() {
    localStorage.removeItem('user');
    location.reload();
}

let set = new Set(); //Униуальные значения, типа массива

for(let i = 0; i < check.length; i++) { 
    check[i].addEventListener('change', (e) => {
        const data = e.target.getAttribute('data');
        if(e.target.checked) {      //нажали на галочку, добавили атрибут в set
            set.add(data);
        } else {
            set.delete(data);       //отжали галочку, атрибут удалился
        }
    
        console.log(set);
        sortItems([...productsArr]);
    })
}

function sortItems(productsArr) {
    let arr = productsArr.filter(item => {
        return set.has(item.genre);
    });
    drawProducts(set.size ? arr : productsArr);
}


// инди - 2 
// симулятор - 2
// экшн - 4
// аркада 2

/*
[
   {
      "name":"Ori",
      "price":20,
      "salePrice": 15,
      "genre":"indie",
      "img":"GameImages/ori.jpg"
   },
   {
      "name":"CitiesSkylines",
      "price":25,
      "salePrice": 20,
      "genre":"simulator",
      "img":"GameImages/citiesskylines.jpg"
   },
   {
      "name":"LittleNightmares5",
      "price":15,
      "salePrice": 10,
      "genre":"indie",
      "img":"GameImages/littlenightmares2.jpg"
   },
   {
      "name":"DontStarve",
      "price":15,
      "salePrice": 10,
      "genre":"arcade",
      "img":"GameImages/dontstarve.jpg"
   },
   {
      "name":"Farcry4",
      "price":5,
      "salePrice": 2.99,
      "genre":"action",
      "img":"GameImages//farcry4.jpg"
   },
   {
      "name":"GTA5",
      "price":30,
      "salePrice": 20,
      "genre":"action",
      "img":"GameImages/gta5.jpg"
   },
   {
      "name":"RDR2",
      "price":60,
      "salePrice": 35,
      "genre":"action",
      "img":"GameImages/rdr2.jpg"
   },
   {
      "name":"Sims4",
      "price":50,
      "salePrice": 40,
      "genre":"simulator",
      "img":"GameImages/sims4.jpg"
   },
   {
      "name":"Terarria",
      "price":20,
      "salePrice": 15,
      "genre":"arcade",
      "img":"GameImages/terraria.jpg"
   }
]
*/