import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PlaylistEmpty from '../components/PlaylistEmpty'
import {
    selectPlaylistItem, playlistChanged, hidePlaylistSubmenu, showGenres, showSearchResults, showMoods,
} from '../core-module/actions'

const mapStateToProps = (state) => ({
    theme: state.settingsReducer.theme,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        showGenres,
        showSearchResults,
        showMoods,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistEmpty);