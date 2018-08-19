import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ListView } from 'react-native'
import ArrangablePlaylist from '../components/ArrangablePlaylist'
import { selectPlaylistItem, playlistChanged } from '../core-module/actions'

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});

const dspl = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
})

const mapStateToProps = (state) => ({
    theme:state.settingsReducer.theme,
    playlistDataSource: dspl.cloneWithRows(state.appReducers.playlistData.videos),
    isLoading: state.serviceReducer.isLoading,
    currentVideoId: state.appReducers.currentVideoId,
    playlistData: state.appReducers.playlistData,
    currentRecommendationRequest: state.appReducers.currentRecommendationRequest
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectPlaylistItem,
        playlistChanged,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArrangablePlaylist);