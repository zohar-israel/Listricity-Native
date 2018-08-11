import { combineReducers } from 'redux'
import appReducers from './appReducers'
import serviceReducer from './serviceReducer'
import flowReducers from './flowReducers'
import settingsReducer from './settingsReducer'

const mainApp = combineReducers({
    flowReducers,
    appReducers,
    serviceReducer,
    settingsReducer,
})

export default mainApp
