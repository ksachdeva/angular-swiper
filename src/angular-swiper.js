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
                showNavButtons: '=',
                loop: '=',
                containerCls: '@',
                paginationCls: '@',
                slideCls: '@',
                direction: '@'
            },
            controller: function($scope) {

                this.buildSwiper = function() {

                    var containerCls = $scope.containerCls || 'unknown';

                    if (containerCls === 'unknown') {
                        $log.error('container-cls is a required attribute');
                        return;
                    }

                    var slidesPerView = $scope.slidesPerView || 1;
                    var slidesPerColumn = $scope.slidesPerColumn || 1;
                    var paginationClickable = $scope.paginationClickable || true;
                    var spaceBetween = $scope.spaceBetween || 0;
                    var direction = $scope.direction || 'horizontal';
                    var showNavButtons = $scope.showNavButtons || false;
                    var loop = $scope.loop || false;

                    var params = {
                        slidesPerView: slidesPerView,
                        slidesPerColumn: slidesPerColumn,
                        paginationClickable: paginationClickable,
                        spaceBetween: spaceBetween,
                        direction: direction,
                        loop: loop
                    };

                    if ($scope.paginationCls) {
                        params.pagination = '.' + $scope.paginationCls;
                    }

                    if (showNavButtons === true) {
                        params.nextButton = '.swiper-button-next';
                        params.prevButton = '.swiper-button-prev';
                    }

                    var swiper = new Swiper('.' + $scope.containerCls, params);
                };
            },

            template: '<div class="{{containerCls}}"><div class="swiper-wrapper" ng-transclude></div><div class="{{paginationCls}}"></div><div ng-if="showNavButtons" class="swiper-button-next"></div><div ng-if="showNavButtons" class="swiper-button-prev"></div></div>'
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