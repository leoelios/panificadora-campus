function controlHeader() {
    const extHeader = document.getElementById('ext-header');
    extHeader.classList.toggle('dp-none');
}

const body = document.body;

window.addEventListener('scroll', () => {
    const headerFull = document.getElementById('header-full');
    const title = document.getElementById("title-site");
    title.style.width = "100px";
    title.style.marginTop = "40px";
    headerFull.style.height = "60px";
})