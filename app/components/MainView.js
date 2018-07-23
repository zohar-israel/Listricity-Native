import React, { Component } from 'react'
import { BackHandler, Alert, ListView, Modal, Text, TouchableOpacity, View, WebView, Dimensions, TouchableHighlight, Image } from 'react-native'
import MainToolbarContainer from '../containers/MainToolbarContainer';
import HomeContainer from '../containers/HomeContainer';
import SearchResultsContainer from '../containers/SearchResultsContainer'
import PlaylistContainer from '../containers/PlaylistContainer'
import ArrangablePlaylistContainer from '../containers/ArrangablePlaylistContainer'
import PlaylistsContainer from '../containers/PlaylistsContainer'
import RecommendContainer from '../containers/RecommendContainer'
import SettingsContainer from '../containers/SettingsContainer'
import MoodsContainer from '../containers/MoodsContainer'
import Orientation from 'react-native-orientation'
// import TranslateYAndOpacity from '../animations/TranslateYAndOpacity'
import styles from './styles/main'
import GenresContainer from '../containers/GenresContainer';

const WINDOW = Dimensions.get('window')

class MainView extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        if (this.props.visibleView == 'home') {
            return false;
        }
        this.props.showHome()
        return true;
    }
    getVisbleView() {
        switch (this.props.visibleView) {
            default:
                return <HomeContainer />
            case 'arrangablePlaylist':
                return <ArrangablePlaylistContainer />
            case 'playlist':
                return <PlaylistContainer />
            case 'playlists':
                return <PlaylistsContainer />
            case 'settings':
                return <SettingsContainer />
            case 'searchResults':
                return <SearchResultsContainer hasData={false} />
            case 'moods':
                return <MoodsContainer />
            case 'genres':
                return <GenresContainer />
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MainToolbarContainer currentVideoId={this.props.currentVideoId} />
                <RecommendContainer />
                {this.getVisbleView()}
            </View >
        )
    }
}

export default MainView













{/* {
                    (!this.props.visibleView || this.props.visibleView === 'home') &&
                    <HomeContainer />
                }

                {
                    this.props.visibleView == 'arrangablePlaylist' &&
                    <ArrangablePlaylistContainer />
                }

                {
                    this.props.visibleView == 'playlist' &&
                    <PlaylistContainer />
                }

                {
                    this.props.visibleView == 'playlists' &&
                    <PlaylistsContainer />
                }

                {
                    this.props.visibleView == 'settings' &&
                    <SettingsContainer />
                }

                {
                    this.props.visibleView == 'searchResults' &&
                    <SearchResultsContainer hasData={false} />
                }

                {
                    this.props.visibleView == 'moods' &&
                    <MoodsContainer />
                }


                {
                    this.props.visibleView == 'genres' &&
                    <GenresContainer />
                } */}

{/* <View style={!this.props.visibleView || this.props.visibleView === 'home' ? styles.visible : styles.hidden}>
                    <HomeContainer />
                </View> */}

{/* <View style={this.props.visibleView === 'playlist' ? styles.visible : styles.hidden}>
                    <PlaylistContainer />
                </View> */}

{/* <View style={this.props.visibleView === 'playlists' ? styles.visible : styles.hidden}>
                    <PlaylistsContainer />
                </View> */}

{/* <View style={this.props.visibleView === 'settings' ? styles.visible : styles.hidden}>
                    <SettingsContainer />
                </View> */}

{/* <View style={this.props.visibleView === 'moods' ? styles.visible : styles.hidden}>
                    <MoodsContainer />
                </View> */}

{/* <View style={this.props.visibleView === 'genres' ? styles.visible : styles.hidden}>
                    <GenresContainer/>                
                </View> */}
