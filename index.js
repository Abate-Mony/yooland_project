const slides = [...document.querySelectorAll(".slide-image-container")]
slides.forEach((slide, index) => {
    slide.style.left = `${index*100}%`
})
let counter = 0
const check = () => {
    if (counter > slides.length - 1) counter = 0
}


const leftArrow = document.getElementById("left-arrow")
const rightArrow = document.getElementById("right-arrow")
const dots = [...document.querySelectorAll(".dot")]
dots[counter].style.backgroundColor = "white"

const changeSlide = () => {
    check()
    dots.forEach((dot, index) => {
        dot.style.backgroundColor = "rgb(46, 41, 34)"
    })

    dots[counter].style.backgroundColor = "white"
    slides.forEach((slide, index) => {

        slide.style.transform = `translateX(-${counter*100}%)`
    })
}
leftArrow.addEventListener("click", () => {
    --counter
    changeSlide()
})
rightArrow.addEventListener("click", () => {
    ++counter
    changeSlide()

})
setInterval(() => {
    ++counter
    changeSlide()
}, 10000);


const nav = document.getElementsByTagName("nav")[0]
window.addEventListener("scroll", e => {
    const navHeight = nav.getBoundingClientRect().height
    const scrollY = window.pageYOffset
    if (scrollY >= navHeight) {
        nav.style.position = "fixed"
        nav.style.backgroundColor = "gray"
    } else {
        nav.style.position = "relative"
        nav.style.backgroundColor = "white"

    }
})
const navToggler = document.getElementById("nav-toggler")
const sideNav = document.querySelector(".side-nav")
const toggleSideNav = () => {
    const left = sideNav.getBoundingClientRect().left
    if (left < 0) {
        sideNav.style.left = "0"
        document.body.style.overflow = "hidden"
    } else {
        sideNav.style.left = "-100%"
        document.body.style.overflow = "auto"
    }
}
navToggler.addEventListener("click", e => {
    toggleSideNav()
})