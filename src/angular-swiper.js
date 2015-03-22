(function(window, angular, undefined) {

    'use strict';

    angular.module('ksSwiper', [])
        .directive('ksSwiperContainer', SwiperContainer)
        .directive('ksSwiperSlide', SwiperSlide);

    /* @ngInject */
    function SwiperContainer() {
        return {
            restrict: 'E',
            transclude: true,

            controller: function() {
                this.buildSwiper = function() {
                    var swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        slidesPerView: 4,
                        paginationClickable: true,
                        spaceBetween: 5
                    });
                };
            },

            template: '<div class="swiper-container"><div class="swiper-wrapper" ng-transclude></div><div class="swiper-pagination"></div></div>'
        }
    }

    /* @ngInject */
    function SwiperSlide($timeout) {
        return {
            restrict: 'E',
            require: '^ksSwiperContainer',
            transclude: true,
            replace: true,
            template: '<div class="swiper-slide" ng-transclude></div>',
            link: function(scope, element, attrs, containerController) {
                if (scope.$last === true) {
                    $timeout(function() {
                        containerController.buildSwiper();
                    }, 0);
                }
            }
        }
    }

})(window, angular, undefined);