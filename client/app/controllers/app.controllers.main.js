(function (app) {
    'use strict';

    // main controller for application management
    app.controller("MainCtrl", ['$scope', 'Subjects', 'Layouts',
        function ($scope, subjects, layouts) {

            // #region model
            $scope.model = {
                isStarted: true
            };

            // #region init

            _bootstrap();

            var Ivan, Olia, stars;
            var settings = {
                starsCount: 170,
                step: 2,
                boyStartPoint: new Point(100, 70),
                girlStartPoint: new Point(250, 70),
                skyVisible: false
            };

            _run();

            // #region public functions
            $scope.changeState = _changeState;
            $scope.reset = _reset;
            $scope.toggleSky = _toggleSky;

            // #region private functions

            function _bootstrap() {
                paper.install(window);
                var canvas = angular.element(document.querySelector('#history'))[0];
                paper.setup(canvas);
            }

            function _run() {
                if (settings.skyVisible) stars = layouts.stars(settings.starsCount);
                _loadSubjects();
            }

            function _loadSubjects() {
                Ivan = new subjects.Boy(settings.boyStartPoint, "Ivan");
                Olia = new subjects.Girl(settings.girlStartPoint, "Olia");
                view.draw();

                if (!view.onFrame)
                    view.onFrame = function (event) {
                        if (!$scope.model.isStarted) return;

                        Ivan.move(settings.step, 0);
                    };
            }

            function _changeState() {
                $scope.model.isStarted = !$scope.model.isStarted;
            }

            function _reset() {
                _clear();
                _run();
            }

            function _clear() {
                Ivan && Ivan.clear();
                Olia && Olia.clear();
                stars && stars.clear();
            }

            function _toggleSky() {
                settings.skyVisible = !settings.skyVisible;
                _reset();
            }
        }]);
})(main);