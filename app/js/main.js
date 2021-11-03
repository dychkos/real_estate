

let btnBurger = document.querySelector('.burger');
let menu = document.querySelector('.header__nav');

btnBurger.addEventListener('click',function (e){
    btnBurger.classList.toggle('open')
    menu.classList.toggle('open')
})


