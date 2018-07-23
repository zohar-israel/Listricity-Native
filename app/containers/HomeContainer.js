import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ListView, View } from 'react-native'
import { showMoods, showHome, showGenres, showPlaylist,showPlaylists, showSearchResults,showSettings, recommend} from '../core-module/actions'
import Home from '../components/Home'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        showHome,
        showGenres,
        showPlaylist,
        showPlaylists,
        showSearchResults,
        showMoods,
        showSettings,
        recommend
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);