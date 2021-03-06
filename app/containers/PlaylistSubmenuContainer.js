import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ListView, View } from 'react-native'
import {
    shufflePlaylist,
    showArrangablePlaylist
} from '../core-module/actions'
import PlaylistSubmenu from '../components/PlaylistSubmenu'

const mapStateToProps = (state) => {
    return {
        theme:state.settingsReducer.theme,
        closeToEnd: state.appReducers.closeToEnd,
        playlistData: state.appReducers.playlistData,
        playlistSubmenuVisible: state.appReducers.playlistSubmenuVisible,
        useLargePlayer: state.settingsReducer.useLargePlayer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        shufflePlaylist,
        showArrangablePlaylist,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistSubmenu);