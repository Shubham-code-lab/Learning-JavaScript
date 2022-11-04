'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function(event) {
    event.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});


/*
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

let nodeList = document.querySelectorAll('.section');
console.log(nodeList);

let HTMLTags = document.getElementsByTagName('button');
console.log(HTMLTags);

HTMLTags[0].remove();
nodeList[0].remove();

console.log(nodeList);
console.log(HTMLTags);

let message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `Please accept all the cookies enter <button class="btn--close-cookie">Got it!</button>`
document.querySelector('.header').prepend(message);


console.log(document.getElementsByClassName('btn--close-cookie'));
document.getElementsByClassName('btn--close-cookie')[0].addEventListener('click', function(){
  message.remove();
})


const logo = document.querySelector('.nav__logo');
console.log(logo.className);

console.log(logo.className);
console.log(logo.getAttribute('designer'));
logo.setAttribute('designer', 'jeevan');

logo.classList.contains();

*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//implementing smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(event) {

    // console.log(event.target.getBoundingClientRect());
    // console.log(btnScrollTo.getBoundingClientRect());
    // console.log(section1.getBoundingClientRect());
    // console.log(window.pageXOffset, window.pageYOffset);
    // console.log(document.documentElement.clientHeight, document.documentElement.clientWidth);
    // console.log(event);
    let section1_co_ordinate = section1.getBoundingClientRect();

    /*
  //scroll to element old method
  window.scrollTo(section1_co_ordinate.left + window.pageXOffset, section1_co_ordinate.top + window.pageYOffset);
 */

    /*
    //scroll to element smooth old method
    window.scrollTo({top: section1_co_ordinate.left + window.pageXOffset,
                     left: section1_co_ordinate.top + window.pageYOffset,
                     behavior: 'smooth'
                    });
    */

    //scroll to element smooth new method
    section1.scrollIntoView({ behavior: 'smooth' });

});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Event Propegation Bubbling and caputring

// if e.stopPropogation() is called in any event handler the execution stop there in respect to execution order


//bubblind defalut execution order :- item, container, bar
/*
document.querySelector('.nav').addEventListener('click', function(e) {
    console.log('nav bar');
    console.log(e.target);
    console.log(e.currentTarget);
    this.style.background = 'red';
});
document.querySelector('.nav__links').addEventListener('click', function(e) {
    console.log('nav container');
    console.log(e.target);
    console.log(e.currentTarget);
    this.style.background = 'blue';
    // e.stopPropagation(); //stop execution further

}); //capture clause true then execution order:- container, item, bar
document.querySelector('.nav__item').addEventListener('click', function(e) {
    console.log('nav item');
    console.log(e.target);
    console.log(e.currentTarget);
    this.style.background = 'yellow';
});
    
*/

document.querySelector('.nav__links').addEventListener('click', function(e) {//even if we are handling event at parent not it child event always occur even if we do not handle it
    if (e.target.classList.contains('nav__link')) {
        e.preventDefault();
        console.log(e.currentTarget); //nav_lists
        console.log(e.target); //nav_items
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Dom Traversing
/*
let h1 = document.querySelector('h1');

console.log(h1.querySelectorAll('.highlight')); //childs of h1 having .hightlight class
console.log(h1.childNodes); //text comment class
console.log(h1.children); //direct children lvl 1

console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)'


let h4 = document.querySelector('.btn--text.btn--scroll-to');
let prev_el = h4.previousElementSibling;
let next_el = h4.nextElementSibling;
let prev_node = h4.previousSibling;
let next_node = h4.nextSibling;
console.log("previous and next element");
console.log(prev_el);
console.log(next_el);
console.log("previous and next node");
console.log(prev_node);
console.log(next_node);
console.log("all the sibling");
console.log(h4.parentNode.children);
console.log(h4.parentElement.children);
[...h1.parentElement.children].forEach(function(el) {
    if (el !== h1) el.style.transform = 'scale(0.5)'; //h1 is variable declared look above
});
*/





//======================================================================================================================================
//Tabbed component
/*
let tabs_container = document.querySelector(".operations__tab-container");
let current_active_tab = document.querySelector('.operations__tab--active');
let active_tab_num = current_active_tab.getAttribute('data-tab');
let active_content = document.querySelector('.operations__content--' + active_tab_num);
active_content.classList.add('operations__content--active');

tabs_container.addEventListener('click', function(event) {
    let new_active_tab = event.target.closest('.operations__tab');
    if (new_active_tab.classList.contains('operations__tab')) {
        new_active_tab.classList.add('operations__tab--active');
        active_content = document.querySelector('.operations__content--' + active_tab_num);
        active_content.classList.remove('operations__content--active');
        active_tab_num = new_active_tab.getAttribute('data-tab');
        active_content = document.querySelector('.operations__content--' + active_tab_num);
        active_content.classList.add('operations__content--active');
        current_active_tab.classList.remove('operations__tab--active');
        current_active_tab = new_active_tab;
    }
});
*/

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(event) {
    const clicked = event.target.closest('.operations__tab');
    //Guard clause
    if (!clicked) return;           //when clicked on caintainer it return null

    //active tab
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    clicked.classList.add('operations__tab--active');

    //Activaste content area
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});




//======================================================================================================================================
//Bluring navigation and passing argument to event handler callback function
const nav = document.querySelector('.nav');

// const linkOpacity = function(event,opacity){
const linkOpacity = function(event){   //opacity is in this keyword
    const targetElement = event.target;
    if(targetElement.classList.contains('nav__link')){
        
        console.log("current", event.currentTarget);
        console.log("target", event.target);
        console.log("this",this);

        const imgElement = targetElement.closest('.nav').querySelector('img');
        targetElement.closest('.nav__links')
        .querySelectorAll('.nav__link')
        .forEach(el=>{
            if(el!=targetElement)el.style.opacity = this.opacity;
        });
        imgElement.style.opacity = this.opacity;
    }
}

nav.addEventListener('mouseover', 
    // function(event){        
    //  linkOpacity(event,  0.5);    //this == undefine 
    // }
    linkOpacity.bind({opacity:0.5})
); 

nav.addEventListener('mouseout',linkOpacity.bind({opacity:1})); //can pass only one argument which is this keyword



//===================================================================================================================================
//Sticky navication
const header = document.querySelector('.header');

// const initialCord = section1.getBoundingClientRect().top;
// console.log(initialCord);
// window.addEventListener('scroll',function(){
//     console.log(window.scrollY);
//     if( initialCord < window.scrollY)
//         nav.classList.add('sticky');
//     else nav.classList.remove('sticky');
// });

const navHeight = nav.getBoundingClientRect().height;
const navOption ={
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
};

const navCallBack = function(entries, observer){
    entries.forEach(entry=>{
            if(entry.isIntersecting){
                nav.classList.remove('sticky');
            }
            else{
                nav.classList.add('sticky');
            }
        }      
        );
}

const navObserver = new IntersectionObserver(navCallBack, navOption);

navObserver.observe(header);


//=================================================================================================================================
//Reavle section on intersecting
const sectionList = document.querySelectorAll('.section');

const sectionOption = {
    root: null,
    threshold: 0.15,
};
const sectionCallBack = function(entries, observer){
    entries.forEach(entry=>{
        if(entry.isIntersecting){
        entry.target.classList.remove('section--hidden');
        observer.unobserve(entry.target);
        }
    });
}
const sectionObserver = new IntersectionObserver(sectionCallBack,sectionOption);

sectionList.forEach(section=>{
    section.classList.add('section--hidden');
    sectionObserver.observe(section);
})


//=================================================================================================================================
//Lazy image loading
const imgList = document.querySelectorAll('img[data-src]');

const imgOption = {
    root:null,
    threshold:0,
    rootMargin: '200px'
};
const imgCallBack = function(entries, observer){
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.src = entry.target.dataset.src;
            entry.target.addEventListener('load', function(){
                entry.target.classList.remove('lazy-img');
            });
            observer.unobserve(entry.target);
        }
    })
};
const imgObserver = new IntersectionObserver(imgCallBack, imgOption);

imgList.forEach(img=>imgObserver.observe(img));


//=====================================================================================================================================
//Slider 
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelector('.dots');
const totalSlide = slides.length;
let slideTracker = totalSlide - 1;     //initialize to last slide

slides.forEach((_,index)=>{
    dotContainer.insertAdjacentHTML(
        'beforeend',               //new element created is added as last child so index is in order 0,1,2,3
        `<button class="dots__dot" data-slide="${index}"></button>`     //index is used for adding dots__dot--actice class
    )
});

const dotsList = document.querySelectorAll('.dots__dot');

const activeDot = function(slideTracker){
    dotsList.forEach(dot=>dot.classList.remove('dots__dot--active'));
    document.querySelector(`button[data-slide="${slideTracker}"]`).classList.add('dots__dot--active'); //look at the css selector
}

const slidePosition =function(slideTracker){
    slides.forEach(function(slide, i){
        slide.style.transform = `translateX(${100*(i-slideTracker)}%)`; //important formula to move all slide
    });
    activeDot(slideTracker);                                            //add active class to dots
}

const goLeft = function(){
    slideTracker = (slideTracker + totalSlide - 1)% totalSlide;   //formula from cricular queue data structure to go to previous slide
    slidePosition(slideTracker);
}

const goRight = function(){
    slideTracker = (slideTracker + 1)% totalSlide;               //formula from cricular queue data structure to go to next slide
    slidePosition(slideTracker);
}

goRight();                                                       //at start we kept index to totalslide-1 hence it is last slide to go to first slide call this function

dotContainer.addEventListener('click', function(event){
    const targetElement = event.target;
    if(targetElement.classList.contains('dots__dot')){
        slideTracker= Number(targetElement.dataset.slide);
        slidePosition(slideTracker);
    }
})

document.addEventListener('keydown', function(event){
    if(event.key === "ArrowLeft") goLeft();                      //same as below syntax
    event.key === "ArrowRight" && goRight();                     //above or below both work same
})

btnLeft.addEventListener('click', goLeft);
btnRight.addEventListener('click', goRight);

 


