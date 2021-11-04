
class Select {
    constructor(selector) {
        this.$el = selector;
        this.#setup();
    }


    #setup() {
        this.clickHandler = this.clickHandler.bind(this);
        this.$el.addEventListener('click', this.clickHandler);
    }

    clickHandler(event) {
        const {type} = event.target.dataset;

        if (!type) {
            this.toggle()
        } else if (type === 'item') {
            const selectedItem = {
                id:event.target.dataset.id,
                value:event.target.textContent
            }
            this.select(selectedItem)
        } else if (type === 'backdrop') {
            this.close()
        }
    }

    get isOpen() {
        return this.$el.classList.contains('open')
    }

    select(selectedItem) {
        this.selectedItem = selectedItem;
        console.log(selectedItem);
        this.$el.querySelector('.dropdown__title').textContent = selectedItem.value;
        this.close()
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.$el.classList.add('open');
    }

    close() {
        this.$el.classList.remove('open') ;
    }

}

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

let btnBurger = document.querySelector('.burger');
let menu = document.querySelector('.header__nav');
let dropdowns = document.querySelectorAll('.dropdown');

btnBurger.addEventListener('click',function (e){
    btnBurger.classList.toggle('open')
    menu.classList.toggle('open')
})


const photoPreviews = document.querySelectorAll("[data-photo]");
const photo = document.querySelector("#house-preview");
const swiperNode = document.querySelector(".sim-swiper");

if(photoPreviews && photo){
    let photoPreview = new PhotoPreview (photo,photoPreviews);
}

if(swiperNode){
    let swiper = new Swiper(".sim-swiper", {
        slidesPerView: "auto",
        spaceBetween: 30,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });

}

dropdowns.forEach(dropdown=>{
    let select = new Select(dropdown);
})