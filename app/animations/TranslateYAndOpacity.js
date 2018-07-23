import React, { Component, PureComponent } from 'react'
import { Animated } from 'react-native'
class TranslateYAndOpacity extends PureComponent {
    constructor(props) {
        super(props)
        let opacityMin=0,translateYMin=0
        this.state = {
            opacityValue: new Animated.Value(opacityMin),
            translateYValue: new Animated.Value(translateYMin),
        };
        // ...
    }
    componentDidMount() {
        // ...
        this.show(this.props);
        // ...
    }
    componentWillReceiveProps(nextProps) {
        if (!this.props.isHidden && nextProps.isHidden) {
            this.hide(nextProps);
        }
        if (this.props.isHidden && !nextProps.isHidden) {
            this.show(nextProps);
        }
    }
    show(props) {
        // ...
        Animated.parallel([
            Animated.timing(this.state.opacityValue, { /* ... */ }),
            Animated.timing(this.state.translateYValue, { /*  ... */ }),
        ]).start();
    }
    hide(props) {
        // ...
        Animated.parallel([
            Animated.timing(this.state.opacityValue, { /* ... */ }),
            Animated.timing(this.state.translateYValue, { /*  ... */ }),
        ]).start();
    }
    render() {
        const { opacityValue, translateYValue } = this.state;

        const animatedStyle = {
            opacity: opacityValue,
            transform: [{ translateY: translateYValue }],
        };

        return (
            <Animated.View style={animatedStyle}>{this.props.children}</Animated.View>
        );
    }
}

export default TranslateYAndOpacity