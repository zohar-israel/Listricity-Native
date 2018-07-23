import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Playlists from '../components/Playlists'
import { selectPlaylistsItem, playlistsChanged, showPlaylist} from '../core-module/actions'

const mapStateToProps = (state) => ({
    playlistsData: state.appReducers.playlists,
    playlistName: state.appReducers.playlistData.name,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectPlaylistsItem,
        playlistsChanged,
        showPlaylist
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);