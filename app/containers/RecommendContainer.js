import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Recommend from '../components/Recommend'
import axios from 'react-native-axios';
import { selectPlaylistItem, showPlaylist, clearPlaylist, playlistChanged, addVideoRecommendation, recommendError } from '../core-module/actions'

const mapStateToProps = (state) => ({
    theme:state.settingsReducer.theme,
    playlistData: state.appReducers.playlistData,
    currentRecommendationRequest: state.appReducers.currentRecommendationRequest,

});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addVideoRecommendation,
        playlistChanged,
        clearPlaylist,
        showPlaylist,
        selectPlaylistItem,
        recommendError
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
