(function(window, angular, undefined) {

    'use strict';

    angular
        .module('ksSwiper')
        .provider('angularSwiperConfig', angularSwiperConfig);

    function angularSwiperConfig() {
        this.params = {
            slidesPerView   : 1,
            slidesPerColumn : 1,
            spaceBetween    : 0,
            direction       : 'horizontal',
            loop            : false,
            initialSlide    : 0,
            showNavButtons  : false
        };

        this.setSlidesPerView = function(slidesPerView) {
            this.params.slidesPerView = slidesPerView;
        }

        this.addSwiperParameter = function(key, value) {
            this.params[key] = value;
        }

        this.$get = function() {
            return this;
        };
    }

})(window, angular, undefined);
