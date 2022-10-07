window.addEventListener("load", e => {
    // console.log("done loading here and you can what you want to do")
    const slides = [...document.querySelectorAll(".slide-image-container")]
    slides.forEach((slide, index) => {
        slide.style.left = `${index*100}%`
    })
    let counter = 0
    const check = () => {
        if (counter > slides.length - 1) { counter = 0 }
        if (counter < 0) {
            counter = slides.length - 1
        }
    }


    const leftArrow = document.getElementById("left-arrow")
    const rightArrow = document.getElementById("right-arrow")
    const topArrow = document.getElementById("top-arrow")
    const downArrow = document.getElementById("down-arrow")
    const dots = [...document.querySelectorAll(".dot")]
    dots[counter].style.backgroundColor = "white"
    dots.forEach((dot, index) => {
        dot.addEventListener("click", e => {
            counter = index
            changeSlide()
        })
    })
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
    topArrow.onclick = function(e) {
        $(document).scrollTop(0);
    }
    downArrow.onclick = function(e) {
        const lastIndex = document.querySelector(".last-index").offsetTop
        $(document).scrollTop(lastIndex);
    }
    window.addEventListener("scroll", e => {
        const lastIndex = document.querySelector(".last-index").offsetTop

        const navHeight = nav.getBoundingClientRect().height
        const scrollY = window.pageYOffset
        const percent = ((scrollY + window.innerHeight) / lastIndex) * 100;
        if (percent > 75) {
            // do something here
            downArrow.classList.add("--d-none")
        } else {
            downArrow.classList.remove("--d-none")
        }
        if (percent < 25) {
            // do something here
            topArrow.classList.add("--d-none")
        } else {
            topArrow.classList.remove("--d-none")

        }
        if (scrollY >= navHeight) {
            nav.style.position = "fixed"
                // nav.style.backgroundColor = "gray"
        } else {
            nav.style.position = "relative"
                // nav.style.backgroundColor = "white"

        }
    })
    const navToggler = document.getElementById("nav-toggler")
    const closeBtn = document.getElementById("close-btn")

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
    if (closeBtn) {
        closeBtn.onclick = toggleSideNav
    }



    const sliderContainer = document.querySelector(".slider-container")
    var isTouchstart = false;
    var firstClickPosition = null

    var isNav = false
    var first = 0
    window.addEventListener("touchstart", e => {
        isNav = true
        first = e.touches[0].clientX

    })
    window.addEventListener("touchmove", e => {
        const scrollx = 50
        const diff = e.touches[0].clientX - first
        if (diff >= 0 && sideNav.getBoundingClientRect().left < 0 && Math.abs(diff) > 30) {
            toggleSideNav()
        }
    })

    sliderContainer.addEventListener("touchstart", e => {
        firstClickPosition = e.touches[0].clientX
        isTouchstart = true
        console.log(firstClickPosition)
    })
    sliderContainer.addEventListener("touchend", e => {
        firstClickPosition = null
        isTouchstart = false
    })
    const slideImage = e => {
        const x = firstClickPosition - e.touches[0].clientX
        if (isTouchstart && x > 0) {
            ++counter
            console.log(counter)
            changeSlide()
            isTouchstart = !isTouchstart
        }
        if (isTouchstart && x < 0) {
            --counter
            console.log(counter)
            changeSlide()
            isTouchstart = !isTouchstart
        }
    }
    sliderContainer.addEventListener("touchmove", slideImage)


})