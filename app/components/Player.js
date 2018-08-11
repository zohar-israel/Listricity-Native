
import React, { PureComponent, Component } from 'react'
import styles, { mainToolbarStyles } from './styles/main'
import YouTube from 'react-native-youtube'
import config from '../config'

class Player extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.play != this.props.play
            || nextProps.videoId != this.props.videoId
            || nextProps.fullscreen != this.props.fullscreen
            || nextProps.loop != this.props.loop
            || nextProps.apiKey != this.props.apiKey
        ) return true
        // return true
        return false
    }
    render = () => <YouTube {...this.props} ref={(e) => this.props.setPlayerReference(e)} />
}

export default Player