const title = 'Campus Ville';
const text = "Panificadora";
const seconds = 0.2;
const titleMain = document.getElementById('title-main');
const cursor = document.getElementById('cursor');

var i = 0;

const ponteiro = setInterval(() => {
    setTitle(title);
}, seconds * 1000);


function setTitle(title) {
    if(title[i] == undefined) {
        clearInterval(ponteiro);
        setTimeout(() => {
            titleMain.innerHTML = text;
            cursor.style.display = "none";
        }, 3000);
    } else {
        titleMain.innerHTML += title[i];
    }
    i++;
}