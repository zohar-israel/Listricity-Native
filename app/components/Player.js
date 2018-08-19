
import React, { PureComponent, Component } from 'react'
import { getThemedStyles } from './styles/themeBuilder'
import YouTube from 'react-native-youtube'
import config from '../config'

class Player extends Component {
    constructor(props) {
        super(props);
        ({ Colors, styles, mainToolbarStyles } = getThemedStyles(props.theme, ['styles', 'mainToolbarStyles']))
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.play != this.props.play
            || nextProps.videoId != this.props.videoId
            || nextProps.fullscreen != this.props.fullscreen
            || nextProps.loop != this.props.loop
            || nextProps.apiKey != this.props.apiKey
            || nextProps.theme != this.props.theme
        ) return true
        // return true
        return false
    }
    render = () => <YouTube {...this.props} ref={(e) => this.props.setPlayerReference(e)} />
}

export default Player