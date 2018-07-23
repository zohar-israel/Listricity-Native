import { combineReducers } from 'redux'
import appReducers from './appReducers'
import serviceReducer from './serviceReducer'
import flowReducers from './flowReducers'

const mainApp = combineReducers({
    flowReducers,
    appReducers,
    serviceReducer,
})

export default mainApp
