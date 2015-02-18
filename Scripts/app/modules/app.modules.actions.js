(function () {
    'use strict';

    // module for objects
    var subjectsModule = angular.module("love-story.activities");

    subjectsModule.factory('Actions',
        function () {
            return {
                move: _move,
                clear: _clear
            };

            function _move(x, y) {
                this.sketch.translate(new Point(x, y));
            }

            function _clear() {
                this.sketch.remove();
            }
        });
})();