import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { selectResult, removePlaylistItem } from '../core-module/actions'
import SearchResult from '../components/SearchResult'

const mapStateToProps = (state) => ({
    theme:state.settingsReducer.theme,
    playlistData: state.appReducers.playlistData,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectResult,
        removePlaylistItem
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);