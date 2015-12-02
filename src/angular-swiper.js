(function(window, angular, undefined) {   // the fork of package https://atmospherejs.com/aaronroberson/angular-swiper. modification: add the scroll bar to the swiper.

    'use strict';

    angular.module('ksSwiper', [])
        .directive('ksSwiperContainer', SwiperContainer)
        .directive('ksSwiperSlide', SwiperSlide);

    function createUUID() {
        // http://www.ietf.org/rfc/rfc4122.txt
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }

    /* @ngInject */
    function SwiperContainer($log) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                onReady: '&',
                slidesPerView: '=',
                slidesPerColumn: '=',
                spaceBetween: '=',
                parallax: '=',
                parallaxTransition: '@',
                paginationIsActive: '=',
                paginationClickable: '=',
                showNavButtons: '=',
                showScrollBar: '=',    // my own code here
                loop: '=',
                autoplay: '=',
                initialSlide: '=',
                containerCls: '@',
                wrapperCls: '@',
                paginationCls: '@',
                slideCls: '@',
                direction: '@',
                swiper: '=',
                overrideParameters: '='
            },
            controller: function($scope, $element) {

                this.buildSwiper = function() {

                    // directive defaults
                    var params = {
                        slidesPerView: $scope.slidesPerView || 1,
                        slidesPerColumn: $scope.slidesPerColumn || 1,
                        spaceBetween: $scope.spaceBetween || 0,
                        direction: $scope.direction || 'horizontal',
                        loop: $scope.loop || false,
                        initialSlide: $scope.initialSlide || 0,
                        showNavButtons: false
                    };

                    if($scope.autoplay === true){
                        params = angular.extend({}, params, {
                            autoplay: true
                        });
                    }

                    if($scope.paginationIsActive === true){
                        params = angular.extend({}, params, {
                            paginationClickable: $scope.paginationClickable || true,
                            pagination: '#paginator-' + $scope.swiper_uuid
                        });
                    }

                    if ($scope.showNavButtons === true) {
                        params.nextButton = '#nextButton-' + $scope.swiper_uuid;
                        params.prevButton = '#prevButton-' + $scope.swiper_uuid;
                    }

                    if ($scope.showScrollBar === true) {   // my own code
                        params.scrollbar = '#scrollBar-' + $scope.swiper_uuid;
                    }

                    if($scope.overrideParameters){
                        params = angular.extend({}, params, $scope.overrideParameters);
                    }

                    var containerCls = $scope.containerCls || '';
                    
                    var swiper;

                    if(angular.isObject($scope.swiper)){
                        $scope.swiper = new Swiper($element[0].firstChild, params);
                        swiper = $scope.swiper;
                    }
                    else {
                        swiper = new Swiper($element[0].firstChild, params);
                    }
                    
                    //If specified, calls this function when the swiper object is available
                    if ($scope.onReady !== undefined)
                        $scope.onReady({ swiper: swiper });
                };
            },

            link: function(scope, element, attrs) {

                var uuid = createUUID();

                scope.swiper_uuid = uuid;

                var paginatorId = "paginator-" + uuid;
                var prevButtonId = "prevButton-" + uuid;
                var nextButtonId = "nextButton-" + uuid;
                var scrollBarId = 'scrollBar-' + uuid;    // my own code here

                angular.element(element[0].querySelector('.swiper-pagination'))
                    .attr('id', paginatorId);

                angular.element(element[0].querySelector('.swiper-button-next'))
                    .attr('id', nextButtonId);

                angular.element(element[0].querySelector('.swiper-button-prev'))
                    .attr('id', prevButtonId);

                angular.element(element[0].querySelector('.swiper-scrollbar'))
                    .attr('id', scrollBarId);   // my own code here
            },

            template: '<div class="swiper-container {{containerCls}}"><div class="parallax-bg" data-swiper-parallax="{{parallaxTransition}}" ng-show="parallax"></div><div class="swiper-wrapper {{wrapperCls}}" ng-transclude></div><div class="swiper-pagination {{paginationCls}}"></div><div class="swiper-button-next" ng-show="showNavButtons"></div><div class="swiper-button-prev" ng-show="showNavButtons"></div><div class="swiper-scrollbar" ng-show="showScrollBar"></div></div>'
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