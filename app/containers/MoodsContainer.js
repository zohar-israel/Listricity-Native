import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ListView, View } from 'react-native'
import { recommendMood } from '../core-module/actions'
import Moods from '../components/Moods'
import moodsData from '../core-module/data/moods'

const mapStateToProps = (state) => {
    return {
        moods: moodsData()
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        recommendMood
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Moods);