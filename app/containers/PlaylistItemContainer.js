import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removePlaylistItem, toggleFavoriteItem, moveUpPlaylistItem, moveDownPlaylistItem, queueNextPlaylistItem } from '../core-module/actions'
import PlaylistItem from '../components/PlaylistItem'

const mapStateToProps = (state, ownProps) => ({
    current: state.appReducers.current,
    playlistShortcut: state.appReducers.playlistShortcut,
    longPressItem: ownProps.longPressItem,
    selectPlaylistItem: ownProps.selectPlaylistItem,
    rowData: ownProps.rowData,
    favorite: ownProps.rowData.favorite,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        removePlaylistItem,
        toggleFavoriteItem,
        moveUpPlaylistItem,
        moveDownPlaylistItem,
        queueNextPlaylistItem,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItem);