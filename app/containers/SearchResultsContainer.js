import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../core-module/actions/ActionTypes'
import { ListView } from 'react-native'
import SearchResults from '../components/SearchResults'
import axios from 'react-native-axios';
import config from '../config'

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});

const mapStateToProps = (state) => ({
    isLoading: state.serviceReducer.isLoading,
    error: state.serviceReducer.error,
    data: state.serviceReducer.data,
    hasData: state.serviceReducer.hasData,
    currentVideoId: state.appReducers.currentVideoId,
    visibleView: state.flowReducers.visibleView,
    searchDataSource: ds.cloneWithRows(state.serviceReducer.data),

});

const mapDispatchToProps = (dispatch) => {
    return {
        callService: (text) => {
            return dispatch(callWebservice(text));
        }
    };
}

export const callWebservice = (text) => {
    return dispatch => {
        dispatch(serviceActionPending())
        let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=' + text + '&topicId=%2Fmusic&type=video&videoCategoryId=10&key=' + config.APIKey + '&_=1529628377959';

        axios.get(url)
            .then(response => {
                dispatch(serviceActionSuccess(response.data.items))
            })
            .catch(error => {
                dispatch(serviceActionError(error))
            });
    }
}

export const serviceActionPending = () => ({
    type: Actions.SERVICE_PENDING
})

export const serviceActionError = (error) => ({
    type: Actions.SERVICE_ERROR,
    error: error
})

export const serviceActionSuccess = (data) => ({
    type: Actions.SERVICE_SUCCESS,
    data: data
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);