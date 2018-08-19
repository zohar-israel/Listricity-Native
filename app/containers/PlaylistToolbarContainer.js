import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ListView, View } from 'react-native'
import {
    savePlaylist,
    shufflePlaylist,
    clearPlaylist,
    playNextlistItem,
    buffPlaylist,
    showArrangablePlaylist,
    togglePlaylistSubmenu,
    hidePlaylistSubmenu
} from '../core-module/actions'
import PlaylistToolbar from '../components/PlaylistToolbar'

const mapStateToProps = (state) => {
    return {
        theme:state.settingsReducer.theme,
        closeToEnd: state.appReducers.closeToEnd,
        playlistData: state.appReducers.playlistData,
        autoBuffUp: state.appReducers.autoBuffUp
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        savePlaylist,
        shufflePlaylist,
        clearPlaylist,
        playNextlistItem,
        buffPlaylist,
        togglePlaylistSubmenu,
        hidePlaylistSubmenu,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistToolbar);