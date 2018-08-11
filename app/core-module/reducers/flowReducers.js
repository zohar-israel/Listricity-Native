import sortBy from 'lodash/sortBy'
import { ListView, Alert } from 'react-native';
import { selectPlaylistItem } from '../actions'
import * as Actions from '../actions/ActionTypes'
import config from '../../config'
import { hookReducer, saveState } from '../../bll/saveState'

const usePersistor = config.usePersistor

const flowReducers = (state = {
    visibleView: 'home',
    searchKind: 'search',
    searchPhrase: '',
    searchVideoId: ''
}, action) => {
    switch (action.type) {
        case Actions.SHOW_GENRES:
            return Object.assign({}, state, {
                visibleView: 'genres'
            })
        case Actions.SHOW_RESULTS:
            return Object.assign({}, state, {
                visibleView: 'searchResults',
                searchKind: action.kind,
                searchPhrase: action.phrase,
                searchVideoId: action.videoId
            })
        case Actions.SHOW_SEARCH_RESULTS:
            return Object.assign({}, state, {
                visibleView: 'searchResults',
                searchKind: 'search',
                searchPhrase: '',
                searchVideoId: ''
            })
        case Actions.VIEW_PLAYLISTS_ITEM:
            return Object.assign({}, state, {
                visibleView: 'searchResults',
                searchKind: 'playlist',
                searchPhrase: action.name,
                searchVideoId: ''
            })
        case Actions.SHOW_MOODS:
            return Object.assign({}, state, {
                visibleView: 'moods'
            })
        case Actions.SHOW_PLAYLIST:
            return Object.assign({}, state, {
                visibleView: 'playlist'
            })
        case Actions.SHOW_PLAYLISTS:
            return Object.assign({}, state, {
                visibleView: 'playlists',
            })
        case Actions.SHOW_HOME:
            return Object.assign({}, state, {
                visibleView: 'home'
            })
        case Actions.SHOW_SETTINGS:
            return Object.assign({}, state, {
                visibleView: 'settings'
            })
        case Actions.SHOW_ARRANGABLE_PLAYLIST:
            return Object.assign({}, state, {
                visibleView: 'arrangablePlaylist',
            })
        case Actions.GET_GENRES:
            return Object.assign({}, state, { genres: genresData })
        case Actions.NETWORK_STATUS:
            return Object.assign({}, state, { isConnected: action.isConnected })
        case Actions.RESTORE_STATES:
            return action.states.flow ? Object.assign({}, state, action.states.flow) : state
        default:
            return state
    }
}

if (!usePersistor) flowReducers = hookReducer(flowReducers, 'flow', r => r)

export default flowReducers