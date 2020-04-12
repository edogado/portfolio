const navbar = document.getElementsByClassName("container")[0];
let navList = document.getElementById("nav-lists");
let navItems = document.querySelectorAll('nav ul li');
let elements = document.getElementsByClassName('typewrite');//sentences for the banner
const bannerSection = document.getElementById("background-image");
const form = document.getElementById("contactForm");
let modal = document.getElementById("modal");
const downloadResume = document.getElementsByClassName("button");

//This shows the navbar
function Show() {
    navList.classList.add("_Menus-show");
}

//This hides the navbar
function Hide(){
    navList.classList.remove("_Menus-show");
}


document.addEventListener("DOMContentLoaded", ()=>{
//---------- typing effect code ---------------------------------
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

//---------- click a navlink closes the mobile menu--------------
    navItems.forEach((link)=>{
        link.addEventListener("click", ()=>{
            setTimeout(()=>{
                Hide();
            }, 250);
        });
    });


//---------- This adds a link for my resume when the download button is clicked ------------------
    for (let i = 0; i < downloadResume.length; i++){
        downloadResume[i].addEventListener("click", ()=>{
            window.open("documents/Edgar%20Morales%20-%20Resume%202019.pdf", "_blank");
        });
    }
//---------- changes the navbar background ----------------------
    const options = {
        root: null,
        threshold: .15
    };

    const aboutObserver = new IntersectionObserver((entries, observer)=>{
        entries.forEach((entry)=>{
            if (!entry.isIntersecting){
                navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                navbar.classList.add('scrolling-page');
            }
            else{
                navbar.style.backgroundColor = 'transparent';
                navbar.classList.remove('scrolling-page');
                navbar.style.transition = 'all ease-out 250ms';
            }
        });
    }, options);

    aboutObserver.observe(bannerSection);

//---------- display a message when form is sent ----------------
    form.onsubmit = ()=>{
        modal.style.display = "block";
    };
});