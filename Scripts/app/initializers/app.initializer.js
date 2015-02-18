(function () {
    'use strict';

    // module for subjects
    angular.module("love-story.subjects", []);

    // module for objects
    angular.module("love-story.objects", []);

    // module for activities
    angular.module("love-story.activities", []);

    // module for layouts
    angular.module("love-story.layouts", ['love-story.activities', 'love-story.objects']);

})();