describe('Angular Swiper provider', function() {

    // 'use strict';

    var swiperConfigProvider;

    beforeEach(function(){
        module('ksSwiper');
    });
    
    beforeEach(function() {
        module(function(angularSwiperConfigProvider) {

        });

        inject(function(_angularSwiperConfig_) {
            swiperConfigProvider = _angularSwiperConfig_;
        });
    });

    it('Should have default config options', function() {
        expect(swiperConfigProvider.params.slidesPerView).toBe(1);
    });

    it('Should have to override options', function() {
        swiperConfigProvider.setSwiperParameters({
            slidesPerView : 3,
            breakpoints   : {
                1024 : {
                    slidesPerView : 4
                }
            }
        });
        expect(swiperConfigProvider.params.slidesPerView).toBe(3);
        expect(swiperConfigProvider.params.breakpoints['1024'].slidesPerView).toBe(4);
    });
});