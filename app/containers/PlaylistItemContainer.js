import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removePlaylistItem, toggleFavoriteItem, selectPlaylistItem, moveUpPlaylistItem, moveDownPlaylistItem, queueNextPlaylistItem} from '../core-module/actions'
import PlaylistItem from '../components/PlaylistItem'

const mapStateToProps = (state) => ({
    current: state.appReducers.current,
    playlistShortcut: state.appReducers.playlistShortcut
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        removePlaylistItem,
        toggleFavoriteItem,
        selectPlaylistItem,
        moveUpPlaylistItem, 
        moveDownPlaylistItem, 
        queueNextPlaylistItem,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItem);