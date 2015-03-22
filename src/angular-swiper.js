(function(window, angular, undefined) {

    'use strict';

    angular.module('ksSwiper', [])
        .directive('ksSwiperContainer', SwiperContainer)
        .directive('ksSwiperSlide', SwiperSlide);

    /* @ngInject */
    function SwiperContainer($log) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                slidesPerView: '=',
                spaceBetween: '=',
                paginationClickable: '=',
                containerCls: '@',
                paginationCls: '@',
                slideCls: '@'
            },
            controller: function($scope) {

                this.buildSwiper = function() {
                    var swiper = new Swiper('.' + $scope.containerCls, {
                        pagination: '.' + $scope.paginationCls,
                        slidesPerView: $scope.slidesPerView,
                        paginationClickable: $scope.paginationClickable,
                        spaceBetween: $scope.spaceBetween
                    });
                };
            },

            template: '<div class="{{containerCls}}"><div class="swiper-wrapper" ng-transclude></div><div class="{{paginationCls}}"></div></div>'
        }
    }

    /* @ngInject */
    function SwiperSlide($timeout) {
        return {
            restrict: 'E',
            require: '^ksSwiperContainer',
            transclude: true,
            template: '<div ng-transclude></div>',
            replace: true,
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