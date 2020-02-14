const btnContinueForm = document.getElementById("btn-continue-register");

function btnControl() {
    const formBefore = document.getElementById("form-before");
    const formAfter = document.getElementById("form-continue");
    formBefore.classList.toggle('continue-cad-form-before');
    setTimeout(() => {
        formAfter.classList.toggle('continue-cad-form-after');
    }, 1000);
}

btnContinueForm.addEventListener('click', () => {
    btnControl();
})

const btnBackForm = document.getElementById("btn-voltar-form");

btnBackForm.addEventListener('click', () => {
    btnControl();
})

// Mask for celular input
    const celphone = document.getElementById("telefone");

    function mascararTel(v){
        v=v.replace(/\D/g,"");            
        v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); 
        v=v.replace(/(\d)(\d{4})$/,"$1-$2");   
        return v;
    }

    celphone.addEventListener('change', () => {
        valor = mascararTel(celphone.value);
        celphone.value = valor;
    })