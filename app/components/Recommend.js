import React, { Component } from 'react'
import { View, WebView } from 'react-native'
import generateUUID from '../bll/uuid'
import config from '../config'
import styles from './styles/main'

const worker = {uri: "file:///android_asset/recommendWorker.html"}// require('../bll/recommendWorker.html')

export default class Recommend extends Component {
    componentDidMount() {
        this.setState({ lastMessage: false })
        setInterval(this.monitorPlaylist.bind(this), 3000)
    }

    researchInProgress = false
    monitorPlaylist() {
        if (!this.researchInProgress && Array.isArray(this.props.playlistData.videos)) {
            let unresearched = this.props.playlistData.videos.find(e => !e.researched)
            let favoriteUnresearched = this.props.playlistData.videos.find(e => !e.researched && (e.favorite || e.selected))
            if (unresearched) {
                let countRecommendtons = 0
                let existingRecommendations = 0
                if (!favoriteUnresearched) {
                    countRecommendtons = this.props.playlistData.videos.reduce(
                        (a = { recommendations: { length: 0 } }, b) => {
                            return {
                                recommendations: {
                                    length:
                                        (a.recommendations ? a.recommendations.length : 0)
                                        + (b.recommendations ? b.recommendations.length : 0)
                                }
                            }
                        })

                    existingRecommendations = countRecommendtons && countRecommendtons.recommendations
                        ? countRecommendtons.recommendations.length : 0
                }

                if (existingRecommendations < 100 || favoriteUnresearched) {
                    if (favoriteUnresearched) {
                        unresearched = favoriteUnresearched;
                        // console.warn('unresearch favorite: ' + favoriteUnresearched.snippet.title)
                    }
                    this.researchInProgress = true;
                    this.currentResearchItem = unresearched;
                    this.recommendations = []
                    this.sendMessage("$('#log').html('Researching: " + this.currentResearchItem.snippet.title + "');")
                    this.sendMessage("recommendTrack('" + this.currentResearchItem.id.videoId + "');")
                }
            }
        }
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.currentRecommendationRequest && nextProps.currentRecommendationRequest !== this.props.currentRecommendationRequest) {
            switch (nextProps.currentRecommendationRequest.type) {
                case 'genre': {
                    this.researchInProgress = true
                    genreRecommendations = []
                    this.props.clearPlaylist()
                    this.props.showPlaylist()
                    this.sendMessage("recommendGenre('" + nextProps.currentRecommendationRequest.genre + "')")
                    break
                }
                case 'mood': {
                    moodRecommendations = []
                    this.props.clearPlaylist()
                    this.props.showPlaylist()
                    this.sendMessage("recommendMood('" + nextProps.currentRecommendationRequest.mood + "')")
                    break
                }
            }
        }
    }
    recommendations = [];
    genreRecommendations = [];
    moodRecommendations = [];
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    handleMessage = (e) => {
        const message = JSON.parse(e.nativeEvent.data)
        let { videos, job } = message
        if (message.researchQueueLength == 0) this.researchInProgress = false
        switch (job.origin) {
            case 'getAPIKey':
                this.sendMessage('setAPIKey("' + config.APIKey + '")')
                break
            case 'track':
                this.props.addVideoRecommendation({ receivedVideoId: job.videoId, newVids: videos })
                this.recommendations = [];
                this.researchInProgress = false;
                break
            case 'mood':
            case 'genre':
                this.shuffleArray(videos)
                let newVids = [...this.props.playlistData.videos];
                let firstBatch = newVids.length == 0
                videos.forEach(v => {
                    v.uuid = generateUUID();
                    newVids.push(v)
                })
                this.props.playlistChanged(newVids)
                if (firstBatch) this.props.selectPlaylistItem(newVids[0])
                break
        }
    }
    sendMessage(code) {
        try {
            this.webView.injectJavaScript(code)
        } catch (e) {
            console.warn(e.message)
        }
    }

    shouldComponentUpdate(props) {
        return false
    }

    render() {
        return (
            <View style={{
                alignSelf: 'stretch',
                alignItems: 'center',
                height: 0,
                backgroundColor: 'white'
            }}>
                {/* <Text
                    ref={el => this.text = el}
                >Rq:{JSON.stringify(this.props.currentRecommendationRequest)}
                    - Rs {this.state && this.state.lastMessage && JSON.stringify(this.state.lastMessage.receivedVideoId)}
                </Text> */}
                <WebView
                    style={{width:300}}
                    ref={el => this.webView = el}
                    source={worker}
                    onMessage={this.handleMessage}
                />
            </View>
        );
    }
}
