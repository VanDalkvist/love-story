(function (app) {
    'use strict';

    // module for objects
    var objectsModule = angular.module("love-story.objects");

    objectsModule.factory('Objects',
        function () {

            // #region model

            // #region public functions
            var factory = {
                Star: _star
            };

            return factory;

            // #region private functions

            function _cloud() {

            }

            function _butterfly() {

            }

            function _star() {
                var star = new PlacedSymbol(new Symbol(new Path.Star({
                    center: new Point(0, 0),
                    points: 5,
                    radius1: 3,
                    radius2: 10,
                    fillColor: 'yellow',
                })));
                star.rotate(Math.random() * 360);
                star.scale(0.25 + Math.random() * 0.75);
                return star;
            }
        });
})(main);