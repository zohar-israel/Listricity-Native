import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PlaylistsEmpty from '../components/PlaylistsEmpty'
import {
    selectPlaylistItem, playlistChanged, hidePlaylistSubmenu, showGenres, showSearchResults, showMoods,
} from '../core-module/actions'

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        showGenres,
        showSearchResults,
        showMoods,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsEmpty);