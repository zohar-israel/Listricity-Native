import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ListView, View } from 'react-native'
import { buffPlaylist, showHome, showGenres, showPlaylist, showSearchResults, playNextlistItem, playPreviouslistItem, setUseLargePlayer } from '../core-module/actions'
import MainToolbar from '../components/MainToolbar'

const mapStateToProps = (state, ownProps) => {
    return {
        closeToEnd: state.appReducers.closeToEnd,
        playlistData: state.appReducers.playlistData,
        currentIndex: state.appReducers.playlistData && Array.isArray(state.appReducers.playlistData.videos) ? state.appReducers.playlistData.videos.findIndex(e => e.uuid === state.appReducers.current.uuid) + 1 : 0,
        info: state.appReducers.info,
        visibleView: state.flowReducers.visibleView,
        useLargePlayer: state.settingsReducer.useLargePlayer,
        fullscreenOnLandscape: state.settingsReducer.fullscreenOnLandscape,
        autoBuffUp: state.settingsReducer.autoBuffUp,
        reloadTime: state.appReducers.reloadTime,
        scrollToCurrent: ownProps.scrollToCurrent,
        currentVideoId: state.appReducers.currentVideoId
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        showHome,
        showPlaylist,
        showSearchResults,
        playNextlistItem,
        playPreviouslistItem,
        buffPlaylist,
        setUseLargePlayer
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainToolbar);