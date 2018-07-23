import * as Actions from '../actions/ActionTypes';

const serviceReducer = (state = { isLoading: false, error: undefined, data: {}, hasData:false }, action) => {
    switch (action.type) {
        case Actions.SERVICE_PENDING:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case Actions.SERVICE_ERROR:
            return Object.assign({}, state, {
                isLoading: false,
                error: action.error
            });
        case Actions.SERVICE_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                data: action.data,
                hasData: true
            }); 
        default:
            return state;
    }
}

export default serviceReducer;