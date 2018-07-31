let Barba = require('barba.js');

export let GeneralTransition = (InClass = 'page-in', OutClass = 'page-out', duration = 1500) =>
    Barba.BaseTransition.extend({
        start: function () {
            /**
             * This function is automatically called as soon the Transition starts
             * this.newContainerLoading is a Promise for the loading of the new container
             * (Barba.js also comes with an handy Promise polyfill!)
             */
            const pageContainer = document.getElementById('page-container');
            pageContainer.style.position = 'absolute';

            // As soon the loading is finished and the old page is faded out, let's fade the new page
            document.dispatchEvent( new Event('page-out'));
            Promise
                .all([this.newContainerLoading, this.pageOut.bind(this)()])
                .then(this.pageIn.bind(this))
                //.then( () => pageContainer.style.position = 'initial' )
                .then( () => document.dispatchEvent(new Event('page-in')))
        },

        pageOut: function() {
            /**
             * WHAAAT
             * this.oldContainer is the HTMLElement of the old Container
             */
            let el = this.oldContainer;

            return new Promise((resolve, reject) => {
                requestAnimationFrame(() => {
                    el.classList.remove(InClass);
                    el.classList.add(OutClass);

                    // hide scrollbar in transition
                    document.body.style['overflow-y'] = 'hidden';
                })
                setTimeout(() => (resolve()), duration);
            });
        },

        pageIn: function() {
            /**
             * this.newContainer is the HTMLElement of the new Container
             * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
             * Please note, newContainer is available just after newContainerLoading is resolved!
             */

            var _this = this;
            var el = this.newContainer;
            
            this.oldContainer.style.visibility = 'hidden';
            this.oldContainer.style.display = 'none';
            el.style.visibility = 'visible';
            
            requestAnimationFrame(() => {
                window.scroll(0,0);
                el.classList.add(InClass);
            })
            setTimeout(() => {
                // Scroll to top and show scrollbar
                document.body.style['overflow-y'] = 'overlay';
                
                this.done();
            }, duration);
        },

    }
);