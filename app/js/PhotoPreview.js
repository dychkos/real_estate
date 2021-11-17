class PhotoPreview{
    constructor($currentPhoto,$photoArray) {
        this.$currentPhoto = $currentPhoto;
        this.$photoArray = $photoArray;
        this.init();
    }

    init(){
        this.changePreviewPhoto = this.changePreviewPhoto.bind(this);
        this.deactivatePreviews = this.deactivatePreviews.bind(this);

        this.$currentPhoto.setAttribute('src',this.$photoArray[0].getAttribute('src'));
        this.$photoArray[0].classList.add('active');
        this.$photoArray.forEach(preview=>{
            preview.addEventListener('click',this.changePreviewPhoto);
        })
    }

    deactivatePreviews () {
        photoPreviews.forEach(photoPreviews=>{
            if(photoPreviews.classList.contains('active')){
                photoPreviews.classList.remove('active');
            }
        })
    }

    changePreviewPhoto (event) {
        this.deactivatePreviews();
        photo.setAttribute('src',event.target.getAttribute('src'));
        event.target.classList.add('active');
    }

}