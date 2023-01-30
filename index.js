window.addEventListener("load", e => {
    // console.log("done loading here and you can what you want to do")
    const slides = [...document.querySelectorAll(".slide-image-container")]
    const H = window.innerHeight
    var popups = [...document.querySelectorAll(".border-bottom-box")]

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
    const nav = document.getElementsByTagName("nav")[0]

    const navHeight = nav.getBoundingClientRect().height
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


    topArrow.onclick = function(e) {
        $(document).scrollTop(0);
    }
    downArrow.onclick = function(e) {
        const lastIndex = document.querySelector(".last-index").offsetTop
        $(document).scrollTop(lastIndex);

    }
    const animate = document.querySelector(".animate")
    var __timer = null
    window.addEventListener("scroll", e => {
        var lastIndex = null
        if (document.querySelector(".last-index")) {
            lastIndex = document.querySelector(".last-index").offsetTop
        }
        if (popups) {
            if (animate) {
                const _top = animate.getBoundingClientRect().top
                if ((0.60 * H) >= _top && (navHeight + 40) <= _top) {
                    if (!animate.classList.contains("_im_there_already")) {
                        animate.classList.add("_im_there_already")
                            // animate herre 
                        const text = ` Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus labore veritatis quo facilis non modi sapiente explicabo, perferendis rem voluptatem fugiat consectetur asperiores provident nulla animi repellat exercitationem quas eligendi earum et,
                        nihil natus? Minima iusto accusamus illum incidunt reprehenderit voluptas harum labore libero nihil commodi quo architecto, dicta veniam.`
                        var i = 0
                        __timer = setInterval(() => {
                            i > text.length - 1 ? i *= -1 : i += 1
                            animate.innerHTML = `<h1 style="padding:3rem 0; text-align:center;color:lightgreen">${text.slice(0, Math.abs(i))}</h2>`
                        }, 50)


                    }
                } else {
                    clearInterval(__timer)
                    animate.classList.remove("_im_there_already")
                    animate.innerHTML = `<h1 style="padding:3rem 0; text-align:center">
                    
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus labore veritatis quo facilis non modi sapiente explicabo, perferendis rem voluptatem fugiat consectetur asperiores provident nulla animi repellat exercitationem quas eligendi earum et,
                    nihil natus? Minima iusto accusamus illum incidunt reprehenderit voluptas harum labore libero nihil commodi quo architecto, dicta veniam.</h2>`
                }

            }
            popups.forEach(popup => {
                const { top } = popup.getBoundingClientRect()
                if (top <= (0.60 * H)) {
                    if (!popup.classList.contains("fadin")) {
                        popup.classList.add("fadin")
                    }
                } else {
                    if (popup.classList.contains("fadin")) {
                        // popup.classList.add("fadin")
                        popup.classList.remove("fadin")
                    }
                }
                // console.log(top)
            });
        }
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
            document.body.style.overflowY = "hidden"
        } else {
            sideNav.style.left = "-100%"
            document.body.style.overflowY = "auto"
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
        if (diff >= 0 && sideNav.getBoundingClientRect().left < 0 && Math.abs(diff) > 50) {
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