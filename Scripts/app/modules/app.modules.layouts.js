(function () {
    'use strict';

    // module for objects
    var objectsModule = angular.module("love-story.layouts");

    objectsModule.factory('Layouts', ['Actions', 'Objects',
        function (actions, objects) {

            // #region public functions

            var layouts = {
                main: _main,
                stars: _stars,
                road: _road
            };

            return layouts;

            // #region private functions

            function _main() {
            }

            function _stars(count) {
                // todo: create settings for users and put sky color there;
                var skyColor = "0E0737";
                var background = _background(skyColor);

                var stars = new Group();
                for (var i = 0; i < count; i++) {
                    var star = new objects.Star();
                    star.position = _randomPoint();
                    stars.addChild(star);
                }

                return {
                    sketch: new Group([
                        background,
                        stars
                    ]),
                    clear: actions['clear'],
                    move: actions['move'],
                };
            }

            function _road() {

            }

            function _background(color) {
                var background = new Path.Rectangle(0, 0, view.size.width, view.size.height);
                background.fillColor = color;
                return background;
            }

            function _randomPoint() {
                return new Point(Math.random() * view.size.width, Math.random() * view.size.height);
            }
        }]);
})();