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
});