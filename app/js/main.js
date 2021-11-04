
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


let btnBurger = document.querySelector('.burger');
let menu = document.querySelector('.header__nav');
let dropdowns = document.querySelectorAll('.dropdown');

btnBurger.addEventListener('click',function (e){
    btnBurger.classList.toggle('open')
    menu.classList.toggle('open')
})

dropdowns.forEach(dropdown=>{
   let select = new Select(dropdown);

})

