import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removePlaylistsItem } from '../core-module/actions'
import PlaylistsItem from '../components/PlaylistsItem'

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        removePlaylistsItem
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsItem);