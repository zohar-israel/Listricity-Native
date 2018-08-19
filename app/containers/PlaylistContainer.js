import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ListView } from 'react-native'
import Playlist from '../components/Playlist'
import { showResults, selectPlaylistItem, playlistChanged, hidePlaylistSubmenu, showGenres, showSearchResults, showMoods } from '../core-module/actions'

const dspl = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
})

const mapStateToProps = (state) => ({
    theme:state.settingsReducer.theme,
    playlistDataSource: dspl.cloneWithRows(state.appReducers.playlistData ? state.appReducers.playlistData.videos : []),
    isLoading: state.serviceReducer.isLoading,
    currentVideoId: state.appReducers.currentVideoId,
    playlistData: state.appReducers.playlistData ? state.appReducers.playlistData : { name: '', videos: [], deleted: [] },
    currentRecommendationRequest: state.appReducers.currentRecommendationRequest,
    playlistShortcut: state.appReducers.playlistShortcut,
    current: state.appReducers.current,
    buffedTime: state.appReducers.buffedTime
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectPlaylistItem,
        playlistChanged,
        hidePlaylistSubmenu,
        showGenres,
        showSearchResults,
        showMoods,
        showResults
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);