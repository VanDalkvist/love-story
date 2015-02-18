(function () {
    'use strict';

    // module for objects
    var subjectsModule = angular.module("love-story.subjects");

    subjectsModule.factory('Subjects', ['Actions',
        function (actions) {

            var settings = {
                eyeXShift: 15,
                eyeYShift: 10,
                eyeSize: 10,
                appleSize: 5,
                headSize: 40,
                earSize: 7
            };

            // #region model

            // #region public functions

            var factory = {
                get Boy() {
                    return _createBoy;
                },
                get Girl() {
                    return _createGirl;
                }
            };

            return factory;

            // #region private functions

            function _createBoy(startPoint, name) {
                return _createMan(startPoint, name, 'male');
            }

            function _createGirl(startPoint, name) {
                return _createMan(startPoint, name, 'female');
            }

            function _createMan(startPoint, name, sex) {
                var man = new Group();

                man.addChildren([
                    _head(startPoint, sex)
                ]);
                return {
                    sketch: man,
                    name: name || '',
                    sex: sex,
                    move: actions['move'],
                    clear: actions['clear']
                };
            }

            function _head(headPoint, sex) {
                var head = new Group();
                var face = new Path.Circle(headPoint, settings.headSize);
                face.name = "face";
                face.strokeColor = 'black';
                face.fillColor = 'white';

                head.addChildren([
                    face,
                    _eye(headPoint, -1, sex),
                    _eye(headPoint, 1, sex),
                    _ear(headPoint, 1),
                    _ear(headPoint, -1),
                    _menMouth(headPoint),// : _womenMouth(headPoint),
                    _nose(headPoint),
                    sex === 'male' ? _menHairs(headPoint) : _womenHairs(headPoint)
                ]);
                return head;
            }

            function _eye(headPoint, shift, sex) {
                var eye = new Group();
                var eyePoint = new Point(headPoint.x + shift * settings.eyeXShift, headPoint.y - settings.eyeYShift);

                var mainCircle = new Path.Circle(eyePoint, settings.eyeSize);
                mainCircle.name = "eye";
                mainCircle.strokeColor = 'black';

                eye.addChildren([
                    mainCircle,
                    _eyeApple(eyePoint)
                ]);
                sex === 'female' && eye.addChild(_eyelashes(eyePoint));
                return eye;
            }

            function _eyeApple(eyePoint) {
                var apple = new Path.Circle(new Point(eyePoint.x, eyePoint.y + 2), settings.appleSize);
                apple.name = "apple";
                apple.fillColor = 'blue';
                return apple;
            }

            function _ear(headPoint, shift) {
                var ear = new Path.Arc({
                    from: [headPoint.x + shift * settings.headSize, headPoint.y - settings.headSize / 4],
                    through: [headPoint.x + shift * settings.headSize + shift * 5, headPoint.y],
                    to: [headPoint.x + shift * settings.headSize, headPoint.y + settings.headSize / 4],
                    strokeColor: 'black'
                });
                return ear;
            }

            function _neck(headPoint) {
                var right = new Path.Line({
                    from: [headPoint.x - settings.headSize / 2, headPoint.y + settings.headSize - 5],
                    to: [headPoint.x - settings.headSize / 2, headPoint.y + settings.headSize + 10],
                    strokeColor: 'black'
                });

                var left = new Path.Line({
                    from: [headPoint.x + settings.headSize / 2, headPoint.y + settings.headSize - 5],
                    to: [headPoint.x + settings.headSize / 2, headPoint.y + settings.headSize + 10],
                    strokeColor: 'black'
                });
                // todo: investigate compound path 
                return new Group([right, left]);
            }

            function _menMouth(headPoint) {
                var mouth = new Group([
                    new Path.Arc({
                        from: [headPoint.x - 20, headPoint.y + 15],
                        through: [headPoint.x, headPoint.y + 25],
                        to: [headPoint.x + 20, headPoint.y + 15],
                        strokeColor: 'black'
                    }),
                    new Path.Arc({
                        from: [headPoint.x - 18, headPoint.y + 13],
                        through: [headPoint.x - 20, headPoint.y + 15],
                        to: [headPoint.x - 22, headPoint.y + 17],
                        strokeColor: 'black'
                    }),
                    new Path.Arc({
                        from: [headPoint.x + 18, headPoint.y + 13],
                        through: [headPoint.x + 20, headPoint.y + 15],
                        to: [headPoint.x + 22, headPoint.y + 17],
                        strokeColor: 'black'
                    })
                ]);
                return mouth;
            }

            function _nose(headPoint) {
                var handleIn = new Point(10, 5);

                var firstPoint = new Point(headPoint.x, headPoint.y);
                var firstSegment = new Segment(firstPoint);

                var secondPoint = new Point(headPoint.x, headPoint.y + 15);
                var secondSegment = new Segment(secondPoint, handleIn);

                var path = new Path(firstSegment, secondSegment);
                path.strokeColor = 'black';
                return path;
            }

            function _menHairs(headPoint) {
                var hairs = new Group();

                for (var i = -6; i < 7; i++) {
                    var arc = new Path.Arc(
                        new Point(headPoint.x, headPoint.y - settings.headSize + 5),
                        new Point(headPoint.x - i * 2, headPoint.y - settings.headSize - 2),
                        new Point(headPoint.x - i * 10, headPoint.y - settings.headSize - 12 + Math.abs(i * 6))
                    );
                    arc.strokeColor = "black";
                    hairs.addChild(arc);
                }

                return hairs;
            }

            function _womenHairs(headPoint) {
                var hairs = new Group();

                for (var i = -30; i < 30; i++) {
                    var step = i % 11;
                    if (step > -5 && step < 5)
                        continue;

                    var sign = i ? i < 0 ? -1 : 1 : 0;
                    var handleOut = new Point(
                        step * 10 + Math.random() * 7 * sign,
                        (sign * 10) / (10 - Math.abs(step)) - Math.random() * 10 * sign);

                    var rootPoint = new Point(
                        headPoint.x,
                        headPoint.y - settings.headSize + Math.random() * 3);
                    var firstSegment = new Segment(rootPoint, null, handleOut);

                    var secondPoint = new Point(
                        headPoint.x + (settings.headSize * step) / 10,
                        headPoint.y + settings.headSize - (10 - step) * sign);
                    var secondSegment = new Segment(secondPoint);

                    var hair = new Path(firstSegment, secondSegment);
                    hair.strokeColor = 'black';
                    hairs.addChild(hair);
                }

                return hairs;
            }

            function _eyelashes(eyePoint) {
                var eyelashes = new Group();
                for (var i = -5; i < 5; i++) {
                    var handleOut = new Point(50 / settings.eyeSize, 30 / settings.eyeSize);

                    var firstPoint = new Point(eyePoint.x + i, eyePoint.y - settings.eyeSize);
                    var firstSegment = new Segment(firstPoint, null, handleOut);

                    var secondPoint = new Point(
                        eyePoint.x + i * 2 + settings.eyeSize / 2,
                        eyePoint.y - 1.5 * settings.eyeSize);
                    var secondSegment = new Segment(secondPoint);

                    var path = new Path([firstSegment, secondSegment]);
                    path.strokeColor = 'black';
                    eyelashes.addChild(path);
                }
                return eyelashes;
            }
        }]);
})();