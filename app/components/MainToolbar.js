import React, { Component } from 'react'
import { Image, Alert, ListView, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles, { mainToolbarStyles } from './styles/main'
import YouTube from 'react-native-youtube'
import Colors from './styles/colors'
import bg from '../res/global/background'
import Orientation from 'react-native-orientation'
import config from '../config'

class MainToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = { status: 'uninited', lastState: false, fullscreen: false, reload: false, resumedAfterFullscreen: false, statusIcon: false }

        Orientation.addOrientationListener((orientation) => {
            if (this.props.fullscreenOnLandscape) {
                if (orientation === 'LANDSCAPE') {
                    this.setState({ fullscreen: true })
                }
                else {
                    this.setState({ fullscreen: false })
                }
                // if (this._youTubeRef) {
                try {
                    this._youTubeRef.forceUpdate()
                } catch (e) {
                    this.setState({ reload: true })
                }
                // }
            }
        })

        this.setFullscreenState(this.props)
    }

    componentDidMount() {
        this.setState({ reload: false })
    }
    setFullscreenState(props) {
        // console.warn('fullscreenOnLandscape: ' + props.fullscreenOnLandscape)
        if (props.fullscreenOnLandscape) {
            Orientation.unlockAllOrientations()
        }
        else
            Orientation.lockToPortrait()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) this.setFullscreenState(nextProps)
    }

    loadingState = false;

    checkLoadStuck = _ => {
        if (this.loadingState) {
            this.props.playNextlistItem()
            this.loadingState = false
        }
    }

    changeFullscreen = e => {
        // hack to reload on return from fullscreen
        // or video size remains large and streaming 
        // is stopped
        if (!e.isFullscreen) {
            this._youTubeRef
                .currentTime()
                .then(currentTime => {
                    this.setState({ reload: true, currentTime: currentTime })
                }
                )
                .catch(errorMessage => console.warn(errorMessage))
        }
    }
    videoReady = e => {
        try {
            if (this.state.resumedAfterFullscreen) {
                this.setState({ resumedAfterFullscreen: false, isReady: true, currentTime: 0 })
                this._youTubeRef.seekTo(this.state.currentTime)
            }
            else {
                this.setState({ isReady: true })
            }
        } catch (e) {
            this.setState({ reload: true })
        }
    }

    statusChanged = e => {
        if (e.state == 'ended') {//} && this.state.status=='playing'){ //} && this.state.lastState && this.state.lastState=='playing') {
            this.setState({ lastState: e.state })
            if ((this.props.closeToEnd || this.props.playlistData.videos.length == 1)
                && this.props.autoBuffUp) this.props.buffPlaylist()
            this.props.playNextlistItem()
        }
        if (e.state == 'loading') {
            if (!this.loadingState) this.loadingState = new Date()
            setTimeout(this.checkLoadStuck.bind(this), 7000)
        }
        else this.loadingState = false

        this.setState({ status: e.state, statusIcon: this.getStatusIcon(e.state) })
    }
    getStatusIcon(status) {
        switch (status) {
            case 'stopped':
                return 'play'
            case 'loading':
                return 'refresh'
            case 'started':
                return 'refresh'
            case 'buffering':
                return 'refresh'
            case 'playing':
                return 'play'
            case 'paused':
                return 'pause'
        }
        return false
    }
    render() {
        if (this.state.reload) {
            setTimeout(
                () => this.setState({ reload: false, resumedAfterFullscreen: true })
                , 100)
        }
        let openStyle = this.props.useLargePlayer ? { height: Dimensions.get('window').width * 120 / 200, width: Dimensions.get('window').width } : {}
        if (this.state.fullscreen) openStyle = { height: Dimensions.get('window').height, width: Dimensions.get('window').width }
        let player
        if (this.props.currentVideoId && 
            !this.state.reload)
            player = <YouTube
                ref={component => {
                    this._youTubeRef = component;
                }}
                videoId={this.props.currentVideoId}   // The YouTube video ID
                play={true} //{this.props.currentVideoId !== false}             // control playback of video with true/false
                fullscreen={this.state.fullscreen}       // control whether the video should play in fullscreen or inline
                loop={false}             // control whether the video should loop when ended
                apiKey={config.APIKey}
                onReady={this.videoReady} //{e => this.setState({ isReady: true })} //e => this.setState({ isReady: true })}
                onChangeState={this.statusChanged}
                onChangeQuality={e => this.setState({ quality: e.quality })}
                onError={e => this.setState({ error: e.error })}
                onChangeFullscreen={this.changeFullscreen}
                //controls={2}
                showFullscreenButton={true}
                style={[mainToolbarStyles.video, openStyle]}
            />
        else
            player = <Image resizeMode="center" source={require('../res/global/no-video.png')} style={[mainToolbarStyles.videoContainer, openStyle]} />

        return (
            <View style={[mainToolbarStyles.container, openStyle]}>
                <Image resizeMode="stretch" source={{ uri: bg }} style={[mainToolbarStyles.background, openStyle]} />
                {!this.props.useLargePlayer && <View
                    style={mainToolbarStyles.toolsContainer}>
                    <View style={mainToolbarStyles.row}>
                        {this.state.statusIcon && <Icon name={this.state.statusIcon} size={16} color={Colors.icon} style={mainToolbarStyles.statusIcon} />}
                        <Text style={mainToolbarStyles.text}>
                            {'\u00A0\u00A0'}{this.props.currentIndex} / {this.props.playlistData.videos.length}</Text>
                    </View>
                    <View
                        style={mainToolbarStyles.toolsRow}>
                        {this.props.visibleView == 'home' &&
                            <Image resizeMode="contain"
                                source={require('../res/icons/listricitylabel.png')}
                                style={mainToolbarStyles.logo}
                            />
                        }
                        {this.props.visibleView != 'home' && <TouchableOpacity
                            onPress={this.props.showHome}>
                            <View style={mainToolbarStyles.toolbarHomeItem}>
                                <Image resizeMode="contain"
                                    source={require('../res/icons/menu.png')}
                                    style={mainToolbarStyles.button}
                                />
                            </View>
                        </TouchableOpacity>}
                        {this.props.visibleView != 'home' &&
                            this.props.visibleView != 'playlist' &&
                            <TouchableOpacity onPress={this.props.showPlaylist}>
                                <View style={mainToolbarStyles.toolbarItem}>
                                    <Image resizeMode="contain"
                                        source={require('../res/icons/playlist.png')}
                                        style={mainToolbarStyles.button}
                                    />
                                </View>
                            </TouchableOpacity>}
                        {this.props.visibleView == 'playlist' &&
                            <TouchableOpacity
                                onPress={this.props.showSearchResults}>
                                <View style={mainToolbarStyles.toolbarItem}>
                                    <Image resizeMode="contain"
                                        source={require('../res/icons/search.png')}
                                        style={mainToolbarStyles.button}
                                    />
                                </View>
                            </TouchableOpacity>}
                    </View>
                </View>}
                <View style={[mainToolbarStyles.videoContainer, openStyle]}>
                    {player}
                </View>
            </View>
        )
    }
}

export default MainToolbar