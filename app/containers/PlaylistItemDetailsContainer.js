import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ListView, View } from 'react-native'
import { removeAllNext, toggleFavoriteItem } from '../core-module/actions'
import PlaylistItemDetails from '../components/PlaylistItemDetails'

const mapStateToProps = (state, ownProps) => {
    return {
        theme: state.settingsReducer.theme,
        onClose: ownProps.onClose,
        rowData: ownProps.rowData,
        showResults: ownProps.showResults,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        removeAllNext,
        toggleFavoriteItem
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItemDetails);