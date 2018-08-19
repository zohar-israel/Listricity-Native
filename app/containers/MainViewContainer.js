import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ListView, View } from 'react-native'
import { showHome, showGenres, showPlaylist, showSearchResults, showPlaylists, playlistImported } from '../core-module/actions'
import MainView from '../components/MainView'

const mapStateToProps = (state) => {

    return {
        theme:state.settingsReducer.theme,
        visibleView: state.flowReducers.visibleView,
        searchKind: state.flowReducers.searchKind,
        isConnected: state.flowReducers.isConnected,
        currentVideoId: state.appReducers.currentVideoId,
        loadFinished: state.appReducers.loadFinished,
        playlists: state.appReducers.playlists
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        showHome,
        showGenres,
        showPlaylist,
        showSearchResults,
        showPlaylists,
        playlistImported
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);