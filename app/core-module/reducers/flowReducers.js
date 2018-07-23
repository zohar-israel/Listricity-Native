import sortBy from 'lodash/sortBy'
import { ListView, Alert } from 'react-native';
import { selectPlaylistItem } from '../actions'
import * as Actions from '../actions/ActionTypes'

const flowReducers = (state = {
    visibleView: 'home',
}, action) => {
    switch (action.type) {
        case Actions.SHOW_GENRES:
            return Object.assign({}, state, {
                visibleView: 'genres'
            })
        case Actions.SHOW_SEARCH_RESULTS:
            return Object.assign({}, state, {
                visibleView: 'searchResults'
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
            return Object.assign({}, state, {
                genres: genresData
            })
        case Actions.GET_GENRES:
            return Object.assign({}, state, { genres: genresData })
        default:
            return state
    }
}

export default flowReducers