import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Playlists from '../components/Playlists'
import { selectPlaylistsItem, playlistsChanged, showPlaylist } from '../core-module/actions'

const mapStateToProps = (state) => ({
    theme:state.settingsReducer.theme,
    playlistsData: state.appReducers.playlists || {},
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectPlaylistsItem,
        playlistsChanged,
        showPlaylist
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);