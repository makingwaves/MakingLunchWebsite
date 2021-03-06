(function() {
    history.scrollRestoration = "manual";

    const lazyJSSelector = "[js-lazy-load]";
    const scrollButtonAttribute = "js-scroll";
    const lazyClass = "lazy-load--show";
    const noJSClass = "no-js";
    const lazyOffset = 50;
    const delayLength = 0.75;

    function isUsingJS() {
        document.querySelector("html").classList.remove(noJSClass);
    }

    function getTimeDifferenceInSeconds(dateA, dateB) {
        const dif = dateA.getTime() - dateB.getTime();
        return  Math.abs(dif / 1000);
    }

    function isInViewport(element, offset) {
        let elementTop = element.offsetTop + element.offsetParent.offsetTop + offset;
        let elementBottom = elementTop + element.offsetHeight;
        let viewportTop = window.scrollY;
        let viewportBottom = viewportTop + window.outerHeight;
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

    function initLazyLoad() {
        const startDate = new Date();

        let lazyLoadElements = document.querySelectorAll(lazyJSSelector);
        let lastDelay = 0;

        if (!lazyLoadElements.length) {
            return;
        }

        lazyLoadElements.forEach(function(element, index) {
            if (isInViewport(element, lazyOffset)) {
                lastDelay = (index + 1) * delayLength;
                element.classList.add(lazyClass);
                element.style.animationDelay = lastDelay + 's';
            }
        });

        window.addEventListener("scroll", function() {
            let elementsAnimated = 0;
            lazyLoadElements.forEach(function(element, index) {
                if (isInViewport(element, lazyOffset) && !element.classList.contains(lazyClass)) {
                    elementsAnimated++;
                    element.classList.add(lazyClass);

                    const differenceInSeconds = getTimeDifferenceInSeconds(startDate, new Date());
                    if(differenceInSeconds < lastDelay) {
                        lastDelay = lastDelay + (delayLength * (elementsAnimated + 1)) - differenceInSeconds;
                        element.style.animationDelay = lastDelay + 's';
                    } else {
                        if(lastDelay === delayLength) lastDelay += delayLength;
                        else lastDelay = delayLength;
                        element.style.animationDelay =  lastDelay + 's';
                    }
                }
            });
        });
    }

    function initScrollButton() {
        let button = document.querySelector(`[${scrollButtonAttribute}]`);
        let targetId = button.getAttribute(scrollButtonAttribute);
        let target = document.querySelector(`#${targetId}`);

        button.addEventListener("click", function() {
            target.focus();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "start"
            });
        });
    }

    isUsingJS();
    initLazyLoad();
    initScrollButton();
})();
