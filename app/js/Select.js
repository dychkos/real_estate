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