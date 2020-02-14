// Configurations
listPhotosSlider = ['donut','pao'];


function openService(serviceName) {
    listServices = [
        'drink',
        'coffe',
        'bread',
        'candy'
    ];
    listServices.splice(listServices.indexOf(serviceName), 1);
    for(var i = 0; i < listServices.length; i++) {
        const elementList = document.getElementById(listServices[i]+"-service");
        elementList.classList.add("height-zero");
    }
    const text = document.getElementById(serviceName+"-service");
    text.classList.toggle("height-zero");
}

function verifyOpened(listServices) {
    const text = document.getElementById(serviceName+"-service");
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



const backDisplay = document.getElementById("main-content");

listCont = 0;
setInterval(() => {
    if(listCont < listPhotosSlider.length - 1) {
        nextPix(listPhotosSlider[listCont]);
        listCont++;
    }
    else {
        nextPix(listPhotosSlider[listCont]);
        listCont = 0;
    }
} , 10000);

function nextPix(listPhotosSlider) {
    backDisplay.classList.toggle('back-'+listPhotosSlider);
}
