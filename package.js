// package metadata file for Meteor.js
var packageName = 'aaronroberson:angular-swiper';
var where = 'client';
var version = '0.2.1';
var summary = 'Angular directive for iDangero.us Swiper';
var gitLink = 'https://github.com/aaronroberson/angular-swiper';
var documentationFile = 'README.md';

// Meta-data
Package.describe({
  name: packageName,
  version: version,
  summary: summary,
  git: gitLink,
  documentation: documentationFile
});

Package.onUse(function(api) {
  api.versionsFrom(['METEOR@0.9.0', 'METEOR@1.0']); // Meteor versions

  api.use('angular:angular@1.3.0', where)
  api.use('swiper:swiper@3.0.5', where); // Dependencies

  api.addFiles('dist/angular-swiper.js', where); // Files in use
}); 