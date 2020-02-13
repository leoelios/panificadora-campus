
function openService(serviceName) {
    const text = document.getElementById(serviceName+"-service");
    text.classList.toggle("height-zero");
}

const candyBtn = document.getElementById("service-candy");
candyBtn.addEventListener('click', () => {
    openService("candy");
});

const breadBtn = document.getElementById("service-bread");
breadBtn.addEventListener('click', () => {
    openService("bread");
});

const drinkBtn = document.getElementById("service-drink");
drinkBtn.addEventListener('click', () => {
    openService("drink");
});

const coffeBtn = document.getElementById("service-coffe");
coffeBtn.addEventListener('click', () => {
    openService("coffe");
});

const displayBack = document.getElementById("main-content");
function changeBack() {
    backPao();
    backDonut();
}

function backPao() {
    displayBack.style.backgroundImage = 'url("img/pao-wall.jpg")';
}

setInterval(() => {
   backPao();
} , 10000);

setInterval(() => {
    backDonut();
}, 20000);


function backDonut() {
    displayBack.style.backgroundImage = 'url("img/donut.jpg")';
}