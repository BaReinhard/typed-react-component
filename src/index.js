import React from 'react';
import PropTypes from 'prop-types';

export default class TypedJS extends React.Component {
    constructor(props) {
        super(props);
        let delayArray = [];
        if (Array.isArray(this.props.delay) && this.props.delay.length < props.typings.length) {
            delayArray = this.props.delay;
            let delayLength = this.props.delay.length;
            if (props.delay.length === 1) {
                delayArray[props.typings.length] = props.delay[0];
                delayArray.fill(props.delay[0], delayLength);
            } else {
                delayArray[props.typings.length] = 1000;
                delayArray.fill(1000, delayLength);
            }
        } else if (Array.isArray(this.props.delay) && this.props.delay.length > props.typings.length) {
            delayArray = this.props.delay;
            delayArray.slice(props.typings.length - 1, this.props.delay.length - 1);
        } else if (Array.isArray(this.props.delay) && this.props.delay.length === props.typings.length) {
            delayArray = this.props.delay;
        } else {
            delayArray[props.typings.length - 1] = props.delay;
            delayArray.fill(props.delay, 0, props.typings.length - 1);
        }
        this.state = {
            typings: props.typings,
            maxIndex: props.typings.length - 1,
            index: 0,
            displayedType: '',
            blinkerStyle: { opacity: 0 },
            typeForward: true,
            delay: delayArray,
            intervalBlinker: setInterval(() => {
                this.setState({
                    blinkerStyle: { opacity: 1 - this.state.blinkerStyle.opacity },
                });
            }, props.blinkerDelay || 200),
        };
    }
    componentWillReceiveProps(nextProps, nextState) {
        let delayArray = [];
        if (Array.isArray(nextProps.delay) && nextProps.delay.length < nextProps.typings.length) {
            delayArray = nextProps.delay;
            let delayLength = nextProps.delay.length;
            if (nextProps.delay.length === 1) {
                delayArray[nextProps.typings.length] = nextProps.delay[0];
                delayArray.fill(nextProps.delay[0], delayLength);
            } else {
                delayArray[nextProps.typings.length] = 1000;
                delayArray.fill(1000, delayLength);
            }
        } else if (Array.isArray(nextProps.delay) && nextProps.delay.length > nextProps.typings.length) {
            delayArray = nextProps.delay;
            delayArray.slice(nextProps.typings.length - 1, nextProps.delay.length - 1);
        } else if (Array.isArray(nextProps.delay) && nextProps.delay.length === nextProps.typings.length) {
            delayArray = nextProps.delay;
        } else {
            delayArray[nextProps.typings.length - 1] = nextProps.delay;
            delayArray.fill(nextProps.delay, 0, nextProps.typings.length - 1);
        }
        this.setState({
            typings: nextProps.typings,
            maxIndex: nextProps.typings.length - 1,
            delay: delayArray,
            blinkerStyle: { opacity: 0 },
        });
    }
    componentDidMount() {
        setTimeout(() => {
            this.beginType();
        }, this.props.startDelay || 100);
    }
    componentWillUnmount() {
        clearInterval(this.state.intervalBlinker);
    }

    beginType = () => {
        if (this.state.displayedType.length !== 0 && !this.state.typeForward) {
            setTimeout(() => {
                this.setState({
                    displayedType: this.state.typings[this.state.index].substring(
                        0,
                        this.state.displayedType.length - 1,
                    ),
                });
                this.beginType();
            }, this.props.backTypeSpeed || this.props.typeSpeed / 2);
        } else if (
            this.state.displayedType.length !== this.state.typings[this.state.index].length &&
            this.state.typeForward
        ) {
            setTimeout(() => {
                this.setState({
                    displayedType: this.state.typings[this.state.index].substring(
                        0,
                        this.state.displayedType.length + 1,
                    ),
                    typeForward:
                        this.state.displayedType.length + 1 === this.state.typings[this.state.index].length
                            ? false
                            : true,
                });
                if (this.state.displayedType.length === this.state.typings[this.state.index].length) {
                    if (!this.props.loop && this.state.index === this.state.maxIndex) {
                        this.props.onComplete && this.props.onComplete();
                    } else {
                        setTimeout(() => {
                            this.beginType();
                        }, this.state.delay[this.state.index]);
                    }
                } else {
                    this.beginType();
                }
            }, this.props.typeSpeed);
        } else {
            this.setState({
                typeForward: true,
                index: this.state.index < this.state.typings.length - 1 ? this.state.index + 1 : 0,
                displayedType: '',
            });
            this.beginType();
        }
    };
    render() {
        return (
            <span style={{ ...this.props.style }}>
                {this.state.displayedType}
                {this.props.lineEnding}
                <span style={Object.assign({}, this.state.blinkerStyle, this.props.blinkerStyle)}>
                    {' '}{this.props.blinkerCharacter || '|'}
                </span>
            </span>
        );
    }
}

TypedJS.propTypes = {
    delay: PropTypes.number,
    typeSpeed: PropTypes.number,
    loop: PropTypes.bool,
    typings: PropTypes.array,
    blinkerDelay: PropTypes.number,
    startDelay: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
    backTypeSpeed: PropTypes.number,
    blinkerCharacter: PropTypes.string,
    onComplete: PropTypes.func,
};
