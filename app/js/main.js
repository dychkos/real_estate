
class Select {
    constructor(selector,options) {
        this.$el = selector;
        this.multy = options.multy ?? false;
        this.placeholder = options.placeholder ?? "Choose item";
        this.selected = [];
        this.#setup();
    }


    get Selected () {
        return this.selected;
    }

    set Selected (selectedItems) {
        return this.selected = selectedItems;
    }


    #setup() {
        this.clickHandler = this.clickHandler.bind(this);
        this.$el.querySelector('.dropdown__title').textContent = this.placeholder;
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
        if(this.multy){
            if(!this.selected.some(el=>el.id===selectedItem.id)){
                this.selected.push(selectedItem);
            }
            this.render();
        }else{
            this.selectedItem = selectedItem;
            console.log(selectedItem);
            this.$el.querySelector('.dropdown__title').textContent =  selectedItem.value;
        }
        this.close()
    }

    selectedToNode(){
        return this.selected.map(elem => {
            let selectedOption = document.createElement("span");
            selectedOption.classList.add("dropdown__multy");
            selectedOption.addEventListener("click", (e) => {
                this.selected  = this.selected.filter(el => el.id !== elem.id);
                this.render(this.selectedToNode(this.selected));
            })
            selectedOption.textContent = elem.value;
            return selectedOption;
        });
    }

    render(){
        let rootNode = this.$el.querySelector('.dropdown__title');
        let selectedNodes = this.selectedToNode();
        if(selectedNodes.length===0){
            rootNode.textContent = this.placeholder;
            return;
        }
        rootNode.textContent="";
        selectedNodes.forEach(el=>{
            rootNode.appendChild(el);
        })

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

    remove(e){

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
    let select = new Select(dropdown,{
        multy:true,
        placeholder:"Choose features"
    });
})

// document.getElementById('file').addEventListener("change",function (e) {
//     let files = this.files;
//     let fileLabel = document.querySelector(".file_label");
//     if (files.length >= 2) {
//         fileLabel.textContent  = files.length + " Files Ready To Upload";
//     } else {
//         fileLabel.textContent = e.target.value.split("\\").pop();
//     }
// });

let orders = document.querySelectorAll(".order");

orders.forEach(order=>{
    order.addEventListener("click",(e)=>{
        order.classList.toggle("order_open");
    })
})


