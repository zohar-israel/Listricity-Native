import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Settings from '../components/Settings'
import { setFullscreenOnLandscape, setUseLargePlayer, setAutoBuffUp } from '../core-module/actions'



const mapStateToProps = (state) => ({
    fullscreenOnLandscape: state.appReducers.fullscreenOnLandscape,
    useLargePlayer: state.appReducers.useLargePlayer,
    autoBuffUp: state.appReducers.autoBuffUp
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setFullscreenOnLandscape,
        setUseLargePlayer,
        setAutoBuffUp,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);