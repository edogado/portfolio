let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");


document.addEventListener("DOMContentLoaded", ()=>{
   navBarToggle.addEventListener("click",()=>{
       mainNav.classList.toggle('active');
   } );
});