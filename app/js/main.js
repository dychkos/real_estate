

let btnBurger = document.querySelector('.burger');
let menu = document.querySelector('.header__nav');
let dropdowns = document.querySelectorAll('.dropdown');

btnBurger.addEventListener('click',function (e){
    btnBurger.classList.toggle('open')
    menu.classList.toggle('open')
})

dropdowns.forEach(dropdown=>{
    dropdown.addEventListener('click',function (e){
        dropdown.classList.toggle('open');
    })

})



