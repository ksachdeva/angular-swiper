# angular-swiper
Directive that wraps nolimits4web/swiper library for AngularJS.
License: Apache

## Installation

```
bower install angular-swiper
```

## Development

```
npm install -g gulp
npm install
bower install
```

## Usage
### Requirements

Add `<script>`s to your `html` files for [angular](https://github.com/angular/bower-angular) and angular-swiper:

```html
    <script src="../bower_components/swiper/dist/js/swiper.js"></script>
    <script src="../bower_components/angular/angular.js"></script>
    <script src="../dist/angular-swiper.js"></script>
```

And add `ksSwiper` as a dependency for your app:

```javascript
angular.module('myApp', ['ksSwiper', ...]);
```

#### Markup
```html
<ks-swiper-container initial-slide="3" loop="false" show-nav-buttons="false" slides-per-view="4" space-between="5" pagination-clickable="false">
    <ks-swiper-slide class="swiper-slide" ng-repeat="s in [1,2,3,4,5,6,7,8,9,10,11,12,13,14]">
        <img ng-src="http://api.randomuser.me/portraits/thumb/men/{{s}}.jpg">
    </ks-swiper-slide>
</ks-swiper-container>
```
