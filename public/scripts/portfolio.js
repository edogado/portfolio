let navList = document.getElementById("nav-lists");
let elements = document.getElementsByClassName('typewrite');//sentences for the banner
const form = document.getElementById("contactForm");
let modal = document.getElementById("modal");

//This shows the navbar
function Show() {
    navList.classList.add("_Menus-show");
}

//This hides the navbar
function Hide(){
    navList.classList.remove("_Menus-show");
}


document.addEventListener("DOMContentLoaded", ()=>{
    let txtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    txtType.prototype.tick = function() {
        let i = this.loopNum % this.toRotate.length;
        let fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        let that = this;
        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 1250;
        }

        setTimeout(function() {
            that.tick();
        }, delta);
    };

    for (let i=0; i<elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-type');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new txtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    form.onsubmit = ()=>{
        modal.style.display = "block";
    };

});