function controlHeader() {
    const extHeader = document.getElementById('ext-header');
    extHeader.classList.toggle('dp-none');
}

const body = document.body;

window.addEventListener('scroll', () => {
    const headerFull = document.getElementById('header-full');
    const title = document.getElementById("title-site");
    title.style.fontSize = "1.5em";
    headerFull.style.height = "60px";
    document.getElementById("title-pan").style.display = "none";
    headerFull.style.backgroundColor = "rgb(221, 189, 147)";
})