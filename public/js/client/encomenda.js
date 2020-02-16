const categories = document.getElementsByClassName("category-items");

for(var i = 0; i < categories.length; i++) {
    categories[i].addEventListener('click', (event) => {
        const object = event.target;
        if(object.classList[1] == "category-items") {
            object.children[1].classList.toggle('categoryClosed');
        } else if(object.parentNode.classList[1] == "category-items"){
            const test = object.parentElement;
            test.children[1].classList.toggle('categoryClosed');
        }
    })
}