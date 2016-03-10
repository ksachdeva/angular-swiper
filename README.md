# angular-swiper
Directive that wraps nolimits4web/swiper library for AngularJS.
License: Apache

## 1 Installation

```
bower install angular-swiper
```

## 2 Development

```
npm install -g gulp
npm install
bower install
```

## 3 Usage
### 3.1 Requirements

Add `<script>`s to your `html` files for [angular](https://github.com/angular/bower-angular) and angular-swiper:

```html
    <link rel="stylesheet" href="bower_components/swiper/dist/css/swiper.min.css">
    
    <script src="../bower_components/swiper/dist/js/swiper.js"></script>
    <script src="../bower_components/angular/angular.js"></script>
    <script src="../dist/angular-swiper.js"></script>
```

And add `ksSwiper` as a dependency for your app:

```javascript
angular.module('myApp', ['ksSwiper', ...]);
```

### 3.2 Sample Markup

Example:
```html
<ks-swiper-container initial-slide="3" loop="false" show-nav-buttons="false" slides-per-view="4" space-between="5" pagination-clickable="false">
    <ks-swiper-slide class="swiper-slide" ng-repeat="s in [1,2,3,4,5,6,7,8,9,10,11,12,13,14]">
        <img ng-src="http://api.randomuser.me/portraits/thumb/men/{{s}}.jpg">
    </ks-swiper-slide>
</ks-swiper-container>
```

### 3.3 Directive default values

If no attributes are given, an object with the following values will be used to initiate the swiper. It is possible to use the directive without specifying attributes.

```javascript
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
```

### 3.4 Possible Attributes

The following attributes can be used with this directive. Please see the [Swiper API Documentation](http://www.idangero.us/swiper/api/#.VZ03Je2qpBc) for more information about the type and description of parameters.

```html
<ks-swiper-container
    slides-per-view="3"
    slides-per-column="1"
    space-between="0"
    pagination-is-active="true"
    pagination-clickable="false"
    show-nav-buttons="false"
    loop="false"
    autoplay="5000"
    initial-slide="0"
    direction="horizontal">
    ...
</ks-swiper-container>
```

### 3.5 Override any parameter

This allows you to pass a javascript object that will override any swiper parameter from the [Swiper API Documentation](http://www.idangero.us/swiper/api/#.VZ03Je2qpBc) that is used initialize swiper.

Example:
```html
<ks-swiper-container override-parameters="{'effect':'cube'}">
    <ks-swiper-slide class="swiper-slide" ng-repeat="s in [1,2,3,4,5,6,7,8,9,10,11,12,13,14]">
      <img ng-src="http://api.randomuser.me/portraits/thumb/men/{{s}}.jpg">
    </ks-swiper-slide>
</ks-swiper-container>
```

### 3.6 Two-Way Binding of Swiper

In some situations it might be useful to access the actual swiper instance. Passing the parent scope will linked it to the model in the directive's isolated scope which is used for the swiper instance.

It can also be used to slideTo(index, speed, runCallbacks), slidePrev(runCallbacks, speed), slideNext(runCallbacks, speed) or for callback functions.

Example Template:
```html
<div ng-controller="TestCtrl">
<ks-swiper-container swiper="swiper">
    <ks-swiper-slide class="swiper-slide" ng-repeat="s in [1,2,3,4,5,6,7,8,9,10,11,12,13,14]">
      <img ng-src="http://api.randomuser.me/portraits/thumb/men/{{s}}.jpg">
    </ks-swiper-slide>
</ks-swiper-container>
</div>
```

Example Controller
```javascript
angular.module('swiperApp')
  .controller('TestCtrl', function($scope){

    $scope.swiper = {};

    $scope.next = function(){
      $scope.swiper.slideNext();
    };

  });
```
### 3.7 Accessing swiper object after it's created

In some situations, like when you wanna listen to swiper events, is useful to know when the swiper object is created (that occurs after all slides are created).

For that purpose is available the on-ready attribute. You can specify a function to be called when the swiper object is created. In the function you can manipulate the swiperobject, and for example, bind an event. The function must has a paramteter called swiper, refering to swiper object.

Example template

```html
<div ng-controller="TestCtrl">
<ks-swiper-container swiper="swiper" on-ready="onReadySwiper(swiper)">
    <ks-swiper-slide class="swiper-slide" ng-repeat="s in [1,2,3,4,5,6,7,8,9,10,11,12,13,14]">
      <img ng-src="http://api.randomuser.me/portraits/thumb/men/{{s}}.jpg">
    </ks-swiper-slide>
</ks-swiper-container>
</div>
```

Example Controller
```javascript
angular.module('swiperApp')
  .controller('TestCtrl', function($scope){

    $scope.swiper = {};

    $scope.onReadySwiper = function (swiper) {
      
      swiper.on('slideChangeStart', function () {
      
        console.log('slideChangeStart');
      });
    };

  });
```
