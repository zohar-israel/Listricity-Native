import React, { Component } from 'react'
import { BackHandler, Alert, ListView, Modal, Text, TouchableOpacity, View, WebView, Dimensions, TouchableHighlight, Image, Linking } from 'react-native'
import MainToolbarContainer from '../containers/MainToolbarContainer';
import HomeContainer from '../containers/HomeContainer';
import SearchResultsContainer from '../containers/SearchResultsContainer'
import PlaylistContainer from '../containers/PlaylistContainer'
import ArrangablePlaylistContainer from '../containers/ArrangablePlaylistContainer'
import PlaylistsContainer from '../containers/PlaylistsContainer'
import RecommendContainer from '../containers/RecommendContainer'
import SettingsContainer from '../containers/SettingsContainer'
import MoodsContainer from '../containers/MoodsContainer'
import NoConnection from './NoConnection'
import Orientation from 'react-native-orientation'
import SplashScreen from './SplashScreen'
import { getThemedStyles } from './styles/themeBuilder'
import GenresContainer from '../containers/GenresContainer';

const WINDOW = Dimensions.get('window')

class MainView extends Component {
    constructor(props) {
        
        // styles and colors are loaded dynamically 
        // to support themes 

        super(props);
        ({ Colors, styles } = getThemedStyles(props.theme, ['styles']))
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    
    handleBackPress = () => {
        // close the app if on the home screen
        if (this.props.visibleView == 'home') {
            return false;
        }
        // handle spacial sub cases
        if (this.props.visibleView == 'searchResults'
            && this.props.searchKind != 'search') {
            if (this.props.searchKind === 'playlist')
                this.props.showPlaylists()
            else
                this.props.showPlaylist()
            return true;
        }
        // return to home screen on all other cases
        this.props.showHome()
        return true;
    }
    getVisbleView() {
        if (!this.props.isConnected) return <NoConnection />

        switch (this.props.visibleView) {
            default:
                return <HomeContainer />
            case 'arrangablePlaylist':
                return <ArrangablePlaylistContainer />
            case 'playlist':
                return null// <PlaylistContainer /> remains loaded and is only hidden for spead ontimization
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
        if (!this.props.loadFinished) return <SplashScreen />
        return (
            <View style={styles.container}>
                <MainToolbarContainer currentVideoId={this.props.currentVideoId} />
                <RecommendContainer />
                <View style={this.props.visibleView === 'playlist' ? styles.visible : styles.hidden}>
                    <PlaylistContainer />
                </View>
                {this.getVisbleView()}
            </View >
        )
    }
}

export default MainView
