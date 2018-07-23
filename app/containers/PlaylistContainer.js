import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ListView } from 'react-native'
import Playlist from '../components/Playlist'
import {
    selectPlaylistItem, playlistChanged, hidePlaylistSubmenu, showGenres, showSearchResults, showMoods,
} from '../core-module/actions'

const dspl = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
})

const mapStateToProps = (state) => ({
    playlistDataSource: dspl.cloneWithRows(state.appReducers.playlistData.videos),
    isLoading: state.serviceReducer.isLoading,
    currentVideoId: state.appReducers.currentVideoId,
    playlistData: state.appReducers.playlistData,
    currentRecommendationRequest: state.appReducers.currentRecommendationRequest,
    playlistShortcut: state.appReducers.playlistShortcut,
    current: state.appReducers.current
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectPlaylistItem,
        playlistChanged,
        hidePlaylistSubmenu,
        showGenres,
        showSearchResults,
        showMoods,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);