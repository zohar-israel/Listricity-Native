import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ListView, View } from 'react-native'
import {
    savePlaylist,
    shufflePlaylist,
    clearPlaylist,
    playNextlistItem,
    buffPlaylist,
    showArrangablePlaylist
} from '../core-module/actions'
import PlaylistSubmenu from '../components/PlaylistSubmenu'

const mapStateToProps = (state) => {
    return {
        closeToEnd: state.appReducers.closeToEnd,
        playlistData: state.appReducers.playlistData,
        playlistSubmenuVisible: state.appReducers.playlistSubmenuVisible
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        savePlaylist,
        shufflePlaylist,
        clearPlaylist,
        playNextlistItem,
        buffPlaylist,
        showArrangablePlaylist,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistSubmenu);