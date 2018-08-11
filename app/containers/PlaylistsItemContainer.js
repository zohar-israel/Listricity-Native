import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removePlaylistsItem, viewPlaylistsItem } from '../core-module/actions'
import PlaylistsItem from '../components/PlaylistsItem'

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        removePlaylistsItem,
        viewPlaylistsItem
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsItem);