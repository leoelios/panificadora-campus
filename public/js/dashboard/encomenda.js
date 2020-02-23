const loadingElements = document.getElementsByClassName('ld');
const realElements = document.getElementsByClassName('real');

function retiredElementsLoading() {
    Array.from(loadingElements).forEach( (element) => {
        element.classList.add('elementsClosed');
    })
}

function visibleElementsReal() {
    Array.from(realElements).forEach( (element) => {
        element.classList.add('realVisible');
    })
}

setTimeout(() => {
    retiredElementsLoading();
    setTimeout(() => {
        visibleElementsReal();
    } , 300);
}, 500);