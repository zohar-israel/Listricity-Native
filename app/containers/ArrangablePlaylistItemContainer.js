import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removePlaylistItem, toggleFavoriteItem, selectPlaylistItem, moveUpPlaylistItem, moveDownPlaylistItem, queueNextPlaylistItem} from '../core-module/actions'
import ArrangablePlaylistItem from '../components/ArrangablePlaylistItem'

const mapStateToProps = (state) => ({
    current: state.appReducers.current,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        removePlaylistItem,
        selectPlaylistItem,
        moveUpPlaylistItem, 
        moveDownPlaylistItem, 
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArrangablePlaylistItem);