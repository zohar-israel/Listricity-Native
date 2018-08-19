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
    searchVideoId: '',
}, action) => {
    switch (action.type) {
        case Actions.SHOW_GENRES:
            return {
                ...state,
                visibleView: 'genres'
            }
        case Actions.SHOW_RESULTS:
            return {
                ...state,
                visibleView: 'searchResults',
                searchKind: action.kind,
                searchPhrase: action.phrase,
                searchVideoId: action.videoId
            }
        case Actions.SHOW_SEARCH_RESULTS:
            return {
                ...state,
                visibleView: 'searchResults',
                searchKind: 'search',
                searchPhrase: '',
                searchVideoId: ''
            }
        case Actions.VIEW_PLAYLISTS_ITEM:
            return {
                ...state,
                visibleView: 'searchResults',
                searchKind: 'playlist',
                searchPhrase: action.name,
                searchVideoId: ''
            }
        case Actions.SHOW_MOODS:
            return {
                ...state,
                visibleView: 'moods'
            }
        case Actions.SHOW_PLAYLIST:
            return {
                ...state,
                visibleView: 'playlist'
            }
        case Actions.SHOW_PLAYLISTS:
            return {
                ...state,
                visibleView: 'playlists',
            }
        case Actions.SHOW_HOME:
            return {
                ...state,
                visibleView: 'home'
            }
        case Actions.SHOW_SETTINGS:
            return {
                ...state,
                visibleView: 'settings'
            }
        case Actions.SHOW_ARRANGABLE_PLAYLIST:
            return {
                ...state,
                visibleView: 'arrangablePlaylist',
            }
        case Actions.GET_GENRES:
            return {
                ...state
                , genres: genresData
            }
        case Actions.NETWORK_STATUS:
            return {
                ...state,
                isConnected: action.isConnected
            }
        case Actions.RESTORE_STATES:
            return action.states.flow
                ? { ...state, ...action.states.flow }
                : state
        default:
            return state
    }
}

if (!usePersistor) flowReducers = hookReducer(flowReducers, 'flow', r => r)

export default flowReducers