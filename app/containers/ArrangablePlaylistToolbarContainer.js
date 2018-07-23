import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ListView, View } from 'react-native'
import {
    shufflePlaylist,
    clearPlaylist,
    showPlaylist,
    hidePlaylistSubmenu
} from '../core-module/actions'
import ArrangablePlaylistToolbar from '../components/ArrangablePlaylistToolbar'

const mapStateToProps = (state) => {
    return {
        closeToEnd: state.appReducers.closeToEnd,
        playlistData: state.appReducers.playlistData
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        shufflePlaylist,
        clearPlaylist,
        showPlaylist,
        hidePlaylistSubmenu,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArrangablePlaylistToolbar);