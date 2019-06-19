(function() {
    history.scrollRestoration = "manual";

    const lazyJSSelector = "[js-lazy-load]";
    const lazyClass = "lazy-load--show";
    const noJSClass = "no-js";
    const lazyOffset = 200;
    const delayLength = 1;

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

            window.addEventListener("scroll", function() {
                if (isInViewport(element, lazyOffset) && !element.classList.contains(lazyClass)) {
                    element.classList.add(lazyClass);

                    const differenceInSeconds = getTimeDifferenceInSeconds(startDate, new Date());
                    if(differenceInSeconds < lastDelay) {
                        lastDelay = lastDelay + delayLength - differenceInSeconds;
                        element.style.animationDelay = lastDelay + 's'

                    } else {
                        element.style.animationDelay =  '0.5s';
                    }

                }
            });
        });
    }

    isUsingJS();
    initLazyLoad();
})();
