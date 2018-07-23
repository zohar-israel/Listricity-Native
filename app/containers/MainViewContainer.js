import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ListView, View } from 'react-native'
import { showHome, showGenres, showPlaylist, showSearchResults } from '../core-module/actions'
import MainView from '../components/MainView'

const mapStateToProps = (state) => {

    return {
        // showGenre: state.flowReducers.showGenre,
        visibleView: state.flowReducers.visibleView,
        // genre: state.flowReducers.genre,
        currentVideoId: state.appReducers.currentVideoId
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        showHome,
        showGenres,
        showPlaylist,
        showSearchResults
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);