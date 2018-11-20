(function() {

    let lazyJSSelector = "[js-lazy-load]";
    let lazyClass = "lazy-load--show";
    let noJSClass = "no-js";
    let lazyOffset = 200;

    function isUsingJS() {
        document.querySelector("html").classList.remove(noJSClass);
    }

    function initLazyLoad() {
        let lazyLoadElements = document.querySelectorAll(lazyJSSelector);

        if (!lazyLoadElements.length) {
            return;
        }

        lazyLoadElements.forEach(function(element) {
            if (isInViewport(element, lazyOffset)) {
                element.classList.add(lazyClass);
            }

            window.addEventListener("scroll", function() {
                if (isInViewport(element, lazyOffset)) {
                    element.classList.add(lazyClass);
                }
            });

        });

        function isInViewport(element, offset) {
            let elementTop = element.offsetTop + element.offsetParent.offsetTop + offset;
            let elementBottom = elementTop + element.offsetHeight;
            let viewportTop = window.scrollY;
            let viewportBottom = viewportTop + window.outerHeight;
            return elementBottom > viewportTop && elementTop < viewportBottom;
        };

    };

    isUsingJS();
    initLazyLoad();

})();
