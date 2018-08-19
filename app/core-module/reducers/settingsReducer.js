import sortBy from 'lodash/sortBy'
import { ListView, Alert } from 'react-native'
import { shufflePlaylist, playNextlistItem } from '../actions'
import { hookReducer, saveState } from '../../bll/saveState'
import * as Actions from '../actions/ActionTypes'
import config from '../../config'

const usePersistor = config.usePersistor

getInitialSettingsState = () => {
    return {
        fullscreenOnLandscape: false,
        useLargePlayer: false,
        autoBuffUp: true,
        theme: 'Dark'
    }
}
let settingsReducer = (state = getInitialSettingsState(), action) => {
    switch (action.type) {
        case Actions.SET_USER_LARGE_PLAYER:
            return {
                ...state,
                useLargePlayer: action.useLargePlayer
            }
        case Actions.SET_AUTO_BUFF_UP:
            return {
                ...state,
                autoBuffUp: action.autoBuffUp
            }
        case Actions.SET_FULLSCREEN_ON_LENDSCAPE:
            return {
                ...state,
                fullscreenOnLandscape: action.fullscreenOnLandscape
            }
        case Actions.SET_THEME:
            return {
                ...state,
                theme: action.theme
            }
        case Actions.RESTORE_STATES:
            return action.states.settings
                ? { ...state, ...action.states.settings }
                : state
        default:
            return state
    }
}

if (!usePersistor) settingsReducer = hookReducer(settingsReducer, 'settings', r => r)

export default settingsReducer