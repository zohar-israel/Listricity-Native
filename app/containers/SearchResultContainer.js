import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { selectResult} from '../core-module/actions'
import SearchResult from '../components/SearchResult'

const mapStateToProps = (state) => ({
    playlistData: state.appReducers.playlistData,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectResult,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);