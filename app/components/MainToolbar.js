
import React, { Component } from 'react'
import { StyleSheet, Image, Alert, ListView, Text, TouchableOpacity, View, Dimensions, Slider, AppState } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles, { mainToolbarStyles } from './styles/main'
import YouTube from 'react-native-youtube'
import Colors from './styles/colors'
import bg from '../res/global/background'
import Orientation from 'react-native-orientation'
import config from '../config'
import Player from './Player'

class MainToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = { play: true, status: 'uninited', lastState: false, fullscreen: false, reload: false, resumed: false, statusIcon: false }

        Orientation.addOrientationListener((orientation) => {
            if (this.props.fullscreenOnLandscape) {
                if (orientation === 'LANDSCAPE') {
                    this.setState({ fullscreen: true, landscape: true })
                }
                else {
                    this.setState({ fullscreen: false, landscape: false })
                }
                if (this._youTubeRef) {
                    try {
                        this._youTubeRef.forceUpdate()
                    } catch (e) {
                        this.reload()
                    }
                }
            }
        })
        this.forcePlay = this.forcePlay.bind(this)
        this.setupProgress = this.setupProgress.bind(this)
        this.updateProgress = this.updateProgress.bind(this)
        this.clearTimers = this.clearTimers.bind(this)
        this.seekTo = this.seekTo.bind(this)
        this.reload = this.reload.bind(this)
        this.setPlayerReference = this.setPlayerReference.bind(this)
        this.statusChanged = this.statusChanged.bind(this)
        this.videoReady = this.videoReady.bind(this)
        this.onVideoError = this.onVideoError.bind(this)
        this.changeFullscreen = this.changeFullscreen.bind(this)
        this.progressChanged = this.progressChanged.bind(this)
        this.clearForcePlayTimer = this.clearForcePlayTimer.bind(this)
        this.handleAppStateChange = this.handleAppStateChange.bind(this)
        this.checkLoadStuck = this.checkLoadStuck.bind(this)
        this.setFullscreenState = this.setFullscreenState.bind(this)
        this.reloadPersistTime = this.reloadPersistTime.bind(this)
        this.checkNeedsBuffing = this.checkNeedsBuffing.bind(this)
        this.getStatusIcon = this.getStatusIcon.bind(this)
        this.formatTime = this.formatTime.bind(this)

        this.forcePlayTimer = false
        this.checkLoadStuckTimer = false
        this.progressTimer = false
        this.reloadTimer = false
        this.loadingState = false
        this.startedAt = new Date()
        this.debugMode = false
        this.seeking = false
        this.lockedToPortrait = true

        this.setFullscreenState(this.props)

    }

    clearForcePlayTimer() {
        if (this.forcePlayTimer) {
            clearTimeout(this.forcePlayTimer)
            this.forcePlayTimer = false
        }
    }
    clearTimers() {
        if (this.checkLoadStuckTimer) clearTimeout(this.checkLoadStuckTimer)
        if (this.seekingTimer) clearTimeout(this.seekingTimer)
        if (this.progressTimer) clearTimeout(this.progressTimer)
        if (this.reloadTimer) clearTimeout(this.reloadTimer)
        this.reloadTimer = false
        this.setState({ duration: false, progress: 0 })
        this.clearForcePlayTimer()
    }
    componentWillUnmount() {
        this.clearTimers()
        this.setState({ reload: false })
        this._youTubeRef = false
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
        this.setState({ reload: false, appState: AppState.currentState, appActive: true, currentTime: 0 })
    }

    handleAppStateChange = (nextAppState) => {

        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            this._youTubeRef = false
            this.setState({ appActive: true, currentTime: this.state.progress ? this.state.progress : 0, duration: false, reload: true });
        }
        if (nextAppState.match(/inactive|background/) && this.state.appState === 'active') {
            if (this.forcePlayTimer) clearTimeout(this.forcePlayTimer)
            if (this.checkLoadStuckTimer) clearTimeout(this.checkLoadStuckTimer)
            if (this.seekingTimer) clearTimeout(this.seekingTimer)
            if (this.progressTimer) clearTimeout(this.progressTimer)
            if (this.reloadTimer) clearTimeout(this.reloadTimer)
            this.reloadTimer = false

            this.setState({ appActive: false });
            this.forceUpdate()
            this._youTubeRef = false
        }
        this.setState({ appState: nextAppState });
    }
    changeFullscreen(e) {
        // hack to reload on return from fullscreen
        // or video size remains large and streaming 
        // is stopped
        if (!e.isFullscreen) {
            this.reloadPersistTime()
            this.lockToPortrait()
        }
        else {
            this.unlockPortrait()
        }
        this.setState({ fullscreen: e.isFullscreen })
    }
    setFullscreenState(props) {
        if (props.fullscreenOnLandscape) {
            this.unlockPortrait()
        }
        else if (!this.state.fullscreen) {
            this.lockToPortrait()
        }
    }
    lockToPortrait() {
        if (!this.lockedToPortrait) {
            Orientation.lockToPortrait()
            this.lockedToPortrait = true
        }
    }
    unlockPortrait() {
        if (this.lockedToPortrait) {
            Orientation.unlockAllOrientations()
            this.lockedToPortrait = false
        }
    }
    setPlayerReference(component) {
        if (component) {
            this._youTubeRef = component;
        }
    }

    onVideoError(e) {
        let msg = 'player error: ' + e.error
        console.warn(msg)
        this.setState({ fp: e.error })
        if (e.error === 'UNAUTHORIZED_OVERLAY' && (this.props.currentVideoId !== this.lastUnauthorizedReload)) {
            this.lastUnauthorizedReload = this.props.currentVideoId
            msg += '\n reloading'
            this.reload()
        } else if (e.error === 'NETWORK_ERROR' || e.error === 'UNKNOWN') {
            msg = false
        } else {
            msg += '\n moving to next'
        }
        if (msg) console.warn(msg)
    }

    shouldComponentUpdate(nextProps, nextState) {

        // get styles depending on the player size setting

        this.openStyle = this.props.useLargePlayer ? { height: Dimensions.get('window').width * 120 / 200, width: Dimensions.get('window').width } : {}

        // select whether to show the player, the background 
        // icon or a blank space

        if (nextProps.currentVideoId != this.props.currentVideoId ||
            nextState.reload != this.state.reload ||
            this.state.status === 'uninited' ||
            this.state.fullscreen != nextState.fullscreen ||
            this.state.play != nextState.play ||
            this.state.landscape != nextState.landscape ||
            nextProps.fullscreenOnLandscape != this.props.fullscreenOnLandscape
        ) {
            if (this.state.landscape != nextState.landscape ||
                nextProps.fullscreenOnLandscape != this.props.fullscreenOnLandscape) this.setFullscreenState(nextProps)

            if (this.state.status !== 'uninited') this._youTubeRef = false
            if (nextState.appActive &&
                this.props.currentVideoId &&
                !nextState.reload &&
                nextProps.currentVideoId === this.props.currentVideoId) {
                this.player = <Player
                    setPlayerReference={this.setPlayerReference}
                    videoId={nextProps.currentVideoId}
                    play={nextState.play}
                    fullscreen={nextState.fullscreen}
                    loop={false}
                    apiKey={config.APIKey}
                    onReady={this.videoReady}
                    onChangeState={this.statusChanged}
                    // onChangeQuality={e => this.setState({ quality: e.quality })}
                    onError={this.onVideoError}
                    onChangeFullscreen={this.changeFullscreen}
                    // controls={2}
                    showFullscreenButton={!(nextState.landscape && nextProps.fullscreenOnLandscape)}
                    style={[mainToolbarStyles.video, this.openStyle]}
                />
            }
            else if (!nextState.reload) {
                this.player = <Image resizeMode="center" source={require('../res/global/no-video.png')} style={[mainToolbarStyles.videoContainer, this.openStyle]} />
            }
            else this.player = null
        }
        return true

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.setFullscreenState(this.props)

        if (this.state.reload && !this.reloadTimer) {
            clearTimeout(this.reloadTimer)
            this.reloadTimer = setTimeout(
                () => {
                    this.setState({ reload: false, resumed: true })
                    this.reloadTimer = false
                }
                , 500)
        }

        // if a track was clicked and when a track is changed
        // we want to reload the player to start playback
        if (
            (this.props.reloadTime
                && new Date() - this.props.reloadTime < 1000
                && this.props.currentVideoId === prevProps.currentVideoId)
            ||
            this.props.currentVideoId !== prevProps.currentVideoId
        ) {
            // video starting either a new one or a replay
            // reset everything and reload player
            this.clearTimers()
            this.startedAt = new Date()
            this.setState({ duration: false, progress: 0, reload: true, currentTime: 0 })
            this._youTubeRef = false
        }
        if (this.props.useLargePlayer !== prevProps.useLargePlayer) {
            this.clearTimers()
            this.reloadPersistTime()
            this._youTubeRef = false
        }
    }

    checkLoadStuck = () => {
        if (this.loadingState) {
            this.props.playNextlistItem()
            this.loadingState = false
        }
    }

    // reload track and continue from the same time
    // used in return from full screen and on 
    // play size changes to set controls right
    reloadPersistTime() {
        if (this._youTubeRef) {
            this._youTubeRef
                .currentTime()
                .then(currentTime => {
                    this._youTubeRef = false
                    this.setState({ reload: true, currentTime: currentTime })
                }
                )
                .catch(errorMessage => console.warn('reload: ' + errorMessage))
        }
    }

    setupProgress() {
        if (this._youTubeRef) {
            this._youTubeRef
                .duration()
                .then(duration => {
                    if (this._youTubeRef) {
                        this.setState({ duration })
                        this.progressTimer = setTimeout(this.updateProgress, 1000)
                    }
                }
                )
                .catch(errorMessage => console.warn(errorMessage))
        }
        else {
            this.progressTimer = setTimeout(this.setupProgress, 1000)
        }
    }
    updateProgress() {
        try {
            if (this._youTubeRef) {
                this._youTubeRef
                    .currentTime()
                    .then(currentTime => {
                        try {
                            if (this._youTubeRef) {
                                if (!this.seeking || new Date() - this.seeking > 2000)
                                    this.setState({ progress: currentTime })
                                this.progressTimer = setTimeout(this.updateProgress, 1000)
                            }
                        } catch (e) { 'progress: ' + console.warn(e.message) }
                    }
                    )
                    .catch(errorMessage => console.warn('progress 1: ' + errorMessage))
            } else {
                this.progressTimer = setTimeout(this.updateProgress, 1000)
            }
        } catch (e) { console.warn('progress 2: ' + e.message) }
    }

    videoReady(e) {
        try {
            if (this.state.resumed) {
                this.setState({ resumed: false, isReady: true, currentTime: 0 })
                if (this._youTubeRef)
                    this._youTubeRef.seekTo(this.state.currentTime)
            }
            else {
                this.setState({ isReady: true })
            }
            this.setState({ play: true })

        } catch (e) {
            console.warn(e.message)
            this.reload()
        }
    }

    reload = () => {
        this._youTubeRef = false
        this.setState({ reload: true })
    }

    checkNeedsBuffing() {
        if ((this.props.closeToEnd
            || this.props.currentIndex > this.props.playlistData.videos.length - 3
        )
            && this.props.autoBuffUp
            && (this.state.lastState == 'ended' || this.props.playlistData.videos.length > 3)
        ) this.props.buffPlaylist(1)
    }

    statusChanged(e) {
        // console.warn(e.state)
        if (e.state == 'ended') {
            this.setState({ lastState: e.state })
            this.checkNeedsBuffing()
            this.props.playNextlistItem()
        }
        if (e.state == 'loading') {
            if (this.checkLoadStuckTimer) clearTimeout(this.checkLoadStuckTimer)
            this.checkLoadStuckTimer = false
            if (!this.loadingState) this.loadingState = new Date()
            this.checkLoadStuckTimer = setTimeout(this.checkLoadStuck.bind(this), 10000)


            this.checkNeedsBuffing()
            this.startedAt = new Date()
        }
        else {
            if (e.state == 'started') this.startedAt = new Date()
            else if ((e.state == 'paused' || e.state == 'stopped') && new Date() - this.startedAt < 4000 && this.loadingState) {
                // for times when video doesn't auto start even though it should
                this.clearForcePlayTimer()
                this.forcePlayTimer = setTimeout(this.forcePlay, 1000, 0)
            }
            else if (e.state == 'playing') {
                if (!this.state.duration) this.setupProgress()

                this.clearForcePlayTimer()
                this.setState({ fp: false })
                this.loadingState = false
                if (this.checkLoadStuckTimer) clearTimeout(this.checkLoadStuckTimer)
                this.checkLoadStuckTimer = false
            }
        }
        this.setState({ status: e.state, statusIcon: this.getStatusIcon(e.state) })
    }

    // youtube vides sometimes don't start despite having play=true
    // this functions checks if state became play and if not
    // stops and starts the video
    forcePlay(itteration) {
        // console.warn('fp '+ itteration)
        if (this.state.status != 'playing') {
            this.setState({ play: false, fp: 'i' + itteration })
            setTimeout(() => this.setState({ play: true }), 200)
            if (itteration > 6) {
                console.warn('Could not force start track')
                this.setState({ fp: 'bust' })
                return
            }

            this.forcePlayTimer = setTimeout(this.forcePlay, 1000, itteration + 1)
        }
    }
    getStatusIcon(status) {
        switch (status) {
            case 'seeking':
            case 'loading':
            case 'started':
            case 'buffering':
                return 'refresh'
            case 'playing':
                return 'play'
            case 'stopped':
            case 'paused':
                return 'pause'
        }
        return false
    }
    seekTo(value) {
        if (this._youTubeRef)
            this._youTubeRef.seekTo(value)
    }
    progressChanged(value) {
        if (Math.abs(this.state.progress - value) > 5 || new Date() - this.seeking < 2000) {
            this.seeking = new Date()
            if (this.seekingTimer) clearTimeout(this.seekingTimer)
            this.seekingTimer = setTimeout(this.seekTo, 1000, value)
            this._slider.setNativeProps({ thumbTintColor: Colors.seek_tracker })
        }
        else {
            this.seeking = false
            this._slider.forceUpdate()
            this.setState({ progress: value })
        }
    }

    formatTime = seconds => {
        if (!seconds) return ''
        var sec_num = parseInt(seconds, 10);
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10 && hours != '00') { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }

        return (hours != '00' ? hours + ':' : '') + (minutes != '00' ? minutes + ':' : '') + seconds;
    }

    render() {
        return (
            <View>
                <View style={[mainToolbarStyles.container]}>
                    <Image resizeMode="stretch" source={{ uri: bg }} style={[mainToolbarStyles.background, this.openStyle]} />
                    {!this.props.useLargePlayer && <View
                        style={mainToolbarStyles.toolsContainer}>
                        <View style={mainToolbarStyles.row}>
                            {this.state.statusIcon && <Icon name={this.state.statusIcon} size={16} color={Colors.icon} style={mainToolbarStyles.statusIcon} />}
                            {(!this.debugMode || !this.state.fp) && <Text style={mainToolbarStyles.text}>
                                {'\u00A0\u00A0'}{this.props.currentIndex} / {this.props.playlistData.videos.length}
                            </Text>}
                            {(this.debugMode && this.state.fp) &&
                                <Text style={mainToolbarStyles.text}>
                                    fp {this.state.fp}
                                </Text>}

                            {this.debugMode && <Text style={mainToolbarStyles.text}> {this.state.status}</Text>}

                        </View>
                        <View
                            style={mainToolbarStyles.toolsRow}>
                            {this.props.visibleView == 'home' &&
                                <TouchableOpacity onPress={this.props.showPlaylist}>
                                    <Image resizeMode="contain"
                                        source={require('../res/icons/listricitylabel.png')}
                                        style={mainToolbarStyles.logo}
                                    />
                                </TouchableOpacity>
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
                    <View style={[mainToolbarStyles.videoContainer, this.openStyle]}>
                        {this.player}
                    </View>
                </View>
                <View style={{
                    backgroundColor: Colors.background_dark, borderBottomColor: Colors.border_container, borderBottomWidth: StyleSheet.hairlineWidth
                    , flexDirection: 'row'
                    , alignItems: 'center'

                }}>
                    <TouchableOpacity onPress={this.props.playPreviouslistItem}>
                        <Icon name='backward' size={16} color={Colors.icon} style={mainToolbarStyles.controlsIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.setUseLargePlayer(!this.props.useLargePlayer)} style={{ marginRight: -5 }}>
                        <Icon name={this.props.useLargePlayer ? 'compress' : 'expand'} size={16} color={Colors.icon} style={mainToolbarStyles.controlsIcon} />
                    </TouchableOpacity>
                    <Slider
                        style={{ flex: 1 }}
                        minimumTrackTintColor={Colors.seek_tracker}
                        maximumTrackTintColor={Colors.seek_tracker}
                        thumbTintColor={!this.seeking || new Date() - this.seeking > 2000 ? Colors.transparent : Colors.seek_tracker}
                        ref={component => {
                            this._slider = component;
                        }}
                        onValueChange={this.progressChanged}
                        value={this.state.progress}
                        maximumValue={this.state.duration || 0} />
                    <Text style={{ marginLeft: -10, marginTop: -2, color: Colors.tool_text }}>{this.formatTime(this.state.duration)}</Text>
                    <TouchableOpacity onPress={this.props.playNextlistItem}>
                        <Icon name='forward' size={16} color={Colors.icon} style={mainToolbarStyles.controlsIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default MainToolbar