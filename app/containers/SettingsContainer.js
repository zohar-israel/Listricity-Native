import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Settings from '../components/Settings'
import { setFullscreenOnLandscape, setUseLargePlayer, setAutoBuffUp } from '../core-module/actions'



const mapStateToProps = (state) => ({
    fullscreenOnLandscape: state.settingsReducer.fullscreenOnLandscape,
    useLargePlayer: state.settingsReducer.useLargePlayer,
    autoBuffUp: state.settingsReducer.autoBuffUp
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setFullscreenOnLandscape,
        setUseLargePlayer,
        setAutoBuffUp,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);