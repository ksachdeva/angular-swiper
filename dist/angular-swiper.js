(function(window, angular) {

    'use strict';

    angular
        .module('ksSwiper', []);

})(window, angular);

(function(window, angular) {

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

        this.setSwiperParameters = function(objKeys) {
            for (var key in objKeys) {
                this.params[key] = objKeys[key];
            }
        }

        this.$get = function() {
            return this;
        };
    }

})(window, angular);

(function(window, angular) {

    'use strict';

    angular
        .module('ksSwiper')
        .directive('ksSwiperContainer', swiperContainerFn)
        .directive('ksSwiperSlide', swiperSlideFn);

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
    function swiperContainerFn() {
        controllerFn.$inject = ["$scope", "$element", "$timeout", "angularSwiperConfig"];
        return {
            restrict   : 'E',
            transclude : true,
            scope      : {
                onReady             : '&',
                onSlideEnd          : '&?',
                slidesPerView       : '=',
                slidesPerColumn     : '=',
                spaceBetween        : '=',
                parallax            : '=',
                parallaxTransition  : '@',
                paginationIsActive  : '=',
                paginationClickable : '=',
                showNavButtons      : '=',
                showScrollBar       : '=',
                loop                : '=',
                autoplay            : '=',
                initialSlide        : '=',
                containerCls        : '@',
                wrapperCls          : '@',
                paginationCls       : '@',
                slideCls            : '@',
                direction           : '@',
                swiper              : '=',
                overrideParameters  : '='
            },
            controller : controllerFn,
            link       : linkFn,

            template: '<div class="swiper-container {{containerCls}}">' +
                '<div class="parallax-bg" data-swiper-parallax="{{parallaxTransition}}" ng-show="parallax"></div>' +
                '<div class="swiper-wrapper {{wrapperCls}}" ng-transclude></div>' +
                '<div class="swiper-pagination {{paginationCls}}"></div>' +
                '<div class="swiper-button-next" ng-show="showNavButtons"></div>' +
                '<div class="swiper-button-prev" ng-show="showNavButtons"></div>' +
                '<div class="swiper-scrollbar" ng-show="showScrollBar"></div>' +
                '</div>'
        };

        /////
        function controllerFn($scope, $element, $timeout, angularSwiperConfig) {
            var uuid = createUUID();

            $scope.swiper_uuid = uuid;

            // directive defaults
            var params = angular.extend({}, angularSwiperConfig, initParams());

            if (!angular.isUndefined($scope.autoplay) && typeof $scope.autoplay === 'number') {
                params = angular.extend({}, params, {
                    autoplay: $scope.autoplay
                });
            }

            if ($scope.paginationIsActive === true) {
                params = angular.extend({}, params, {
                    paginationClickable: $scope.paginationClickable || true,
                    pagination: '#paginator-' + $scope.swiper_uuid
                });
            }

            if ($scope.showNavButtons === true) {
                params.nextButton = '#nextButton-' + $scope.swiper_uuid;
                params.prevButton = '#prevButton-' + $scope.swiper_uuid;
            }

            if ($scope.showScrollBar === true) {
                params.scrollbar = '#scrollBar-' + $scope.swiper_uuid;
            }

            if ($scope.overrideParameters) {
                params = angular.extend({}, params, $scope.overrideParameters);
            }

            if ($scope.onSlideEnd) {
                params.onReachEnd = function (swiper){
                    $scope.onSlideEnd(swiper);
                };
            }

            $timeout(function() {
                var swiper = null;

                if (angular.isObject($scope.swiper)) {
                    $scope.swiper = new Swiper($element[0].firstChild, params);
                    swiper = $scope.swiper;
                } else {
                    swiper = new Swiper($element[0].firstChild, params);
                }

                //If specified, calls this function when the swiper object is available
                if (!angular.isUndefined($scope.onReady)) {
                    $scope.onReady({
                        swiper: swiper
                    });
                }
            });

            //// Private
            function initParams() {
                var defaults = {};
                
                if ($scope.slidesPerView)   { defaults.slidesPerView = $scope.slidesPerView; }
                if ($scope.slidesPerColumn) { defaults.slidesPerColumn = $scope.slidesPerColumn; }
                if ($scope.spaceBetween)    { defaults.spaceBetween = $scope.spaceBetween; }
                if ($scope.direction)       { defaults.direction = $scope.direction; }
                if ($scope.loop)            { defaults.loop = $scope.loop; }
                if ($scope.initialSlide)    { defaults.initialSlide = $scope.initialSlide; }
                if ($scope.showNavButtons)  { defaults.showNavButtons = $scope.showNavButtons; }

                return defaults;
            }
        }

        function linkFn(scope, element) {

                var uuid = scope.swiper_uuid;

                var paginatorId  = "paginator-" + uuid;
                var prevButtonId = "prevButton-" + uuid;
                var nextButtonId = "nextButton-" + uuid;
                var scrollBarId  = 'scrollBar-' + uuid;

                var containerElement = element[0];

                angular.element(containerElement.querySelector('.swiper-pagination'))
                    .attr('id', paginatorId);

                angular.element(containerElement.querySelector('.swiper-button-next'))
                    .attr('id', nextButtonId);

                angular.element(containerElement.querySelector('.swiper-button-prev'))
                    .attr('id', prevButtonId);

                angular.element(element[0].querySelector('.swiper-scrollbar'))
                    .attr('id', scrollBarId);
            }
    }

    /* @ngInject */
    function swiperSlideFn() {
        return {
              restrict   : 'E',
              require    : '^ksSwiperContainer',
              transclude : true,
              scope      : {
                sliderCls : '@',
                slides    : '='
              },
            template: '<div class="swiper-slide {{sliderCls}}" ng-transclude></div>',
            replace: true
        };
    }

})(window, angular);
