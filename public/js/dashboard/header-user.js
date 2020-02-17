const btnControlUser = document.getElementById('btn-control-user');

btnControlUser.addEventListener('click' , () => {
    const headerUser = document.getElementById('header-user');
    const userConfig = document.getElementById('user-config');
    userConfig.classList.toggle('dp-none');
    headerUser.classList.toggle('header-user-closed');
})