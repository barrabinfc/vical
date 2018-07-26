let Barba = require('barba.js');

export let GeneralTransition = (InClass = 'fade-in', OutClass = 'fade-out', duration = 1500) =>
    Barba.BaseTransition.extend({
        start: function () {
            /**
             * This function is automatically called as soon the Transition starts
             * this.newContainerLoading is a Promise for the loading of the new container
             * (Barba.js also comes with an handy Promise polyfill!)
             */

            // As soon the loading is finished and the old page is faded out, let's fade the new page
            Promise
                .all([this.newContainerLoading, this.fadeOut.bind(this)()])
                .then(this.fadeIn.bind(this));
        },

        fadeOut: function() {
            /**
             * WHAAAT
             * this.oldContainer is the HTMLElement of the old Container
             */
            let el = this.oldContainer;

            return new Promise((resolve, reject) => {
                requestAnimationFrame(() => {
                    el.classList.remove(InClass);
                    el.classList.add(OutClass);
                })
                setTimeout(() => (resolve()), duration);
            });
        },

        fadeIn: function() {
            /**
             * this.newContainer is the HTMLElement of the new Container
             * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
             * Please note, newContainer is available just after newContainerLoading is resolved!
             */

            var _this = this;
            var el = this.newContainer;

            this.oldContainer.style.visibility = 'hidden';
            el.style.visibility = 'visible';
            
            requestAnimationFrame(() => {
                el.classList.add(InClass);
            })
            setTimeout(() => {
                this.done();
            }, duration);
        },

    }
);