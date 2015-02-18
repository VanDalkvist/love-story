(function (app) {
    'use strict';

    // module for objects
    var objectsModule = angular.module("love-story.activities");

    objectsModule.factory('Activities',
        function () {

            // #region model

            // #region public functions
            
            var factory = {
                changeLayout: _changeLayout
            };
            
            return factory;

            // #region private functions

            function _changeLayout() {
                
            }
        });
})(main);