import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ListView, View } from 'react-native'
import { selectGenre } from '../core-module/actions'
import Genres from '../components/Genres'
import genresData from '../core-module/data/genres'

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});

const mapStateToProps = (state) => {
    return {
        genresDataSource: ds.cloneWithRows(genresData()),
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectGenre
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Genres);