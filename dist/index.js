(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes);
        global.index = mod.exports;
    }
})(this, function (exports, _react, _propTypes) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _propTypes2 = _interopRequireDefault(_propTypes);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var TypedJS = function (_React$Component) {
        _inherits(TypedJS, _React$Component);

        function TypedJS(props) {
            _classCallCheck(this, TypedJS);

            var _this = _possibleConstructorReturn(this, (TypedJS.__proto__ || Object.getPrototypeOf(TypedJS)).call(this, props));

            _this.beginType = function () {
                if (_this.state.displayedType.length !== 0 && !_this.state.typeForward) {
                    setTimeout(function () {
                        _this.setState({
                            displayedType: _this.state.typings[_this.state.index].substring(0, _this.state.displayedType.length - 1)
                        });
                        _this.beginType();
                    }, _this.props.typeSpeed / 2);
                } else if (_this.state.displayedType.length !== _this.state.typings[_this.state.index].length && _this.state.typeForward) {
                    setTimeout(function () {
                        _this.setState({
                            displayedType: _this.state.typings[_this.state.index].substring(0, _this.state.displayedType.length + 1),
                            typeForward: _this.state.displayedType.length + 1 === _this.state.typings[_this.state.index].length ? false : true
                        });
                        if (_this.state.displayedType.length === _this.state.typings[_this.state.index].length) {
                            if (!_this.props.loop && _this.state.index === _this.state.maxIndex) {} else {
                                setTimeout(function () {
                                    _this.beginType();
                                }, _this.props.delay);
                            }
                        } else {
                            _this.beginType();
                        }
                    }, _this.props.typeSpeed);
                } else {
                    _this.setState({
                        typeForward: true,
                        index: _this.state.index < _this.state.typings.length - 1 ? _this.state.index + 1 : 0,
                        displayedType: ''
                    });
                    _this.beginType();
                }
            };

            _this.state = {
                typings: props.typings,
                maxIndex: props.typings.length - 1,
                index: 0,
                displayedType: '',
                blinkerStyle: { opacity: 0 },
                typeForward: true,
                intervalBlinker: setInterval(function () {
                    _this.setState({
                        blinkerStyle: { opacity: 1 - _this.state.blinkerStyle.opacity }
                    });
                }, props.blinkerDelay || 200)
            };
            return _this;
        }

        _createClass(TypedJS, [{
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps, nextState) {
                this.setState({
                    typings: nextProps.typings,
                    maxIndex: nextProps.typings.length - 1,
                    blinkerStyle: { opacity: 0 }
                });
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this2 = this;

                setTimeout(function () {
                    _this2.beginType();
                }, this.props.startDelay || 100);
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                clearInterval(this.state.intervalBlinker);
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'span',
                    { style: _extends({}, this.props.style) },
                    this.state.displayedType,
                    _react2.default.createElement(
                        'span',
                        { style: this.state.blinkerStyle },
                        ' |'
                    )
                );
            }
        }]);

        return TypedJS;
    }(_react2.default.Component);

    exports.default = TypedJS;


    TypedJS.propTypes = {
        delay: _propTypes2.default.number,
        typeSpeed: _propTypes2.default.number,
        loop: _propTypes2.default.bool,
        typings: _propTypes2.default.array,
        blinkerDelay: _propTypes2.default.number,
        startDelay: _propTypes2.default.number
    };
});