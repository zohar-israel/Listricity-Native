import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ListView, View } from 'react-native'
import { showHome, showGenres, showPlaylist, showSearchResults, showPlaylists } from '../core-module/actions'
import MainView from '../components/MainView'

const mapStateToProps = (state) => {

    return {
        visibleView: state.flowReducers.visibleView,
        searchKind: state.flowReducers.searchKind,
        isConnected: state.flowReducers.isConnected,
        currentVideoId: state.appReducers.currentVideoId,
        loadFinished: state.appReducers.loadFinished 
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        showHome,
        showGenres,
        showPlaylist,
        showSearchResults,
        showPlaylists
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);