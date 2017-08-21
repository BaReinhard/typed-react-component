import React from 'react';
import PropTypes from 'prop-types';

export default class TypedJS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typings: props.typings,
            maxIndex: props.typings.length - 1,
            index: 0,
            displayedType: '',
            blinkerStyle: { opacity: 0 },
            typeForward: true,
            intervalBlinker: setInterval(() => {
                this.setState({
                    blinkerStyle: { opacity: 1 - this.state.blinkerStyle.opacity },
                });
            }, props.blinkerDelay || 200),
        };
    }
    componentWillReceiveProps(nextProps, nextState) {
        this.setState({
            typings: nextProps.typings,
            maxIndex: nextProps.typings.length - 1,
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
            }, this.props.typeSpeed / 2);
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
                    } else {
                        setTimeout(() => {
                            this.beginType();
                        }, this.props.delay);
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
                <span style={this.state.blinkerStyle}> |</span>
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
    startDelay: PropTypes.number,
};
