import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Recommend from '../components/Recommend'
import axios from 'react-native-axios';
import {selectPlaylistItem, showPlaylist, clearPlaylist, playlistChanged, addVideoRecommendation } from '../core-module/actions'

const mapStateToProps = (state) => ({
    playlistData: state.appReducers.playlistData,
    currentRecommendationRequest: state.appReducers.currentRecommendationRequest,

});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addVideoRecommendation,
        playlistChanged,
        clearPlaylist,
        showPlaylist,
        selectPlaylistItem
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
