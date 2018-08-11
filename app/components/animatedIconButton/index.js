import React, { Component } from 'react'
import { TouchableOpacity, View, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const AnimatedIcon = Animated.createAnimatedComponent(Icon)

class AnimatedIconButton extends Component {
    constructor(props) {
        super(props);
        this.iconPressed = this.iconPressed.bind(this)
        this.state = {
            size: new Animated.Value(this.props.size),
            checked: this.props.checked,
            dim: new Animated.Value(40),
        }
    }

    iconPressed() {
        setTimeout(() =>
            this.setState({ checked: !this.state.checked })
            , 130)
        const animations = [
            Animated.spring(
                this.state.size,
                {
                    toValue: this.props.size * 1.2,
                    bounciness: 7,
                    speed: 230
                    // useNativeDriver: true
                }
            ),
            Animated.timing(
                this.state.size,
                {
                    toValue: this.props.size,
                    bounciness: 7,
                    speed: 230
                    // useNativeDriver: true
                }
            )
        ]
        Animated.sequence(animations).start(this.props.onPress)
    }
    render() {
        var color = this.state.size.interpolate({
            inputRange: [this.props.size, this.props.size * 1.2],
            outputRange: [this.props.color, this.props.highlightColor]
        });
        return (
            <TouchableOpacity style={[this.props.touchableStyle, { width: this.props.size * 1.2 }]} onPress={this.iconPressed}>
                <View style={[this.props.containerStyle, { alignItems: 'center', width: this.props.size * 1.2 }]}>
                    <AnimatedIcon
                        ref={el => this._icon = el}
                        name={this.state.checked ? this.props.checkedIcon : this.props.uncheckedIcon}
                        style={{ fontSize: this.state.size, color: color }} />
                </View>
            </TouchableOpacity>
        )
    }
}

export default AnimatedIconButton