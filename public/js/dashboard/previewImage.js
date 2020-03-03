const inputImage = document.querySelector('#inp-image');
inputImage.addEventListener('change', previewImage)


function previewImage(event) {
    var reader = new FileReader();
    const imagePreview = document.querySelector('#img-previewed');
    
    reader.onload = () => {
        if(reader.readyState == 2) {
            imagePreview.src = reader.result;
            imagePreview.style.display = "flex";
            const afterPreview = document.querySelector('#text-preview-image');
            afterPreview.style.display = "none";
        }
    }
    reader.readAsDataURL(event.target.files[0]);
}