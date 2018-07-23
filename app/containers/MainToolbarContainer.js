import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ListView, View } from 'react-native'
import { buffPlaylist, showHome, showGenres, showPlaylist, showSearchResults, playNextlistItem } from '../core-module/actions'
import MainToolbar from '../components/MainToolbar'

const mapStateToProps = (state) => {
    return {
        closeToEnd: state.appReducers.closeToEnd,
        playlistData: state.appReducers.playlistData,
        currentIndex: Array.isArray(state.appReducers.playlistData.videos) ? state.appReducers.playlistData.videos.findIndex(e => e.uuid === state.appReducers.current.uuid) + 1 : 0,
        info: state.appReducers.info,
        visibleView: state.flowReducers.visibleView,
        useLargePlayer: state.appReducers.useLargePlayer,
        fullscreenOnLandscape: state.appReducers.fullscreenOnLandscape,
        autoBuffUp: state.appReducers.autoBuffUp
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        showHome,
        showGenres,
        showPlaylist,
        showSearchResults,
        playNextlistItem,
        buffPlaylist
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainToolbar);