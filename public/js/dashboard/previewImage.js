const inputImage = document.querySelector('#inp-image');
inputImage.addEventListener('change', previewImage)


function previewImage(event) {
    var reader = new FileReader();
    const imagePreview = document.querySelector('#img-previewed');
    const msgBox = document.querySelector('#msg-error-upload');
    const image = event.target.files[0];
    reader.onload = () => {
        if(reader.readyState == 2 && image.size < (1024 * 1024 * 2)) {
            imagePreview.src = reader.result;
            imagePreview.style.display = "flex";
            const afterPreview = document.querySelector('#text-preview-image');
            afterPreview.style.display = "none";
        } else if(image.size > (1024 * 1024 * 2)) {
            msgBox.innerHTML = "Imagem muito grande, selecione até 2mb.";
        }
    }
    reader.readAsDataURL(image);
}