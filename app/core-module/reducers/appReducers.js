import sortBy from 'lodash/sortBy'
import { ListView, Alert } from 'react-native'
import { shufflePlaylist, playNextlistItem } from '../actions'
import { shuffle, remove, removeAllNext, toggleFavorite, next, previous, moveUpPlaylistItem, moveDownPlaylistItem, queueNextPlaylistItem, addVideoRecommendation, savePlaylist, deletePlaylist, importPlaylist } from '../../bll/playlists'
import { hookReducer, saveState } from '../../bll/saveState'

import { selectResult } from '../../bll/search'
import { buff } from '../../bll/playlists/buff'
import * as Actions from '../actions/ActionTypes'
import config from '../../config'

const usePersistor = config.usePersistor

getInitialAppState = () => {
    return {
        currentVideoId: false,
        // data: [],
        playlistData: { name: '', videos: [], deleted: [] },
        playlists: {},
        loadFinished: false
    }
}
let appReducers = (state = getInitialAppState(), action) => {
    if (!state.playlistData || !state.playlistData.videos) state = { ...state, ...getInitialAppState() }
    switch (action.type) {
        case Actions.SAVE_PLAYLIST:
            return savePlaylist(state, action)
        case Actions.IMPORT_PLAYLIST:
            return { ...state, playlistData: { name: '', videos: action.videos }, currentRecommendationRequest: false }
        case Actions.SHUFFLE_PLAYLIST:
            return shuffle(state)
        case Actions.CLEAR_PLAYLIST:
            return { ...state, playlistData: { ...state.playlistData, name: '', videos: [] }, playlistSubmenuVisible: false }
        case Actions.REMOVE_PLAYLIST_ITEM:
            return remove(state, action)
        case Actions.MOVE_UP_PLAYLIST_ITEM:
            return moveUpPlaylistItem(state, action)
        case Actions.MOVE_DOWN_PLAYLIST_ITEM:
            return moveDownPlaylistItem(state, action)
        case Actions.QUEUE_NEXT_PLAYLIST_ITEM:
            return queueNextPlaylistItem(state, action)
        case Actions.TOGGLE_FAVORITE_ITEM:
            return toggleFavorite(state, action)
        case Actions.PLAYLIST_CHANGED:
            return { ...state, playlistData: { ...state.playlistData, videos: action.playlistData }, currentRecommendationRequest: false }
        case Actions.PLAYLISTS_CHANGED:
            return { ...state, playlists: action.playlistsData }
        case Actions.PLAY_NEXT:
            return next(state)
        case Actions.PLAY_PREVIOUS:
            return previous(state)
        case Actions.BUFF_PLAYLIST:
            return buff(state, action)
        case Actions.SELECT_RESULT:
            return selectResult(state, action)
        case Actions.SELECT_GENRE:
            return { ...state, currentRecommendationRequest: { type: 'genre', genre: action.genre.title } }
        case Actions.SELECT_PLAYLIST_ITEM:
            if (action.result.id.videoId === state.currentVideoId) {
                return { ...state, reloadTime: new Date() }
            }
            return {
                ...state,
                currentVideoId: action.result.id.videoId,
                current: action.result,
            }
        case Actions.SELECT_PLAYLISTS_ITEM: {
            let autoPlay = action.playlist.data.videos.length > 0 ? {
                currentVideoId: action.playlist.data.videos[0].id.videoId,
                current: action.playlist.data.videos[0]
            } : {}
            return { ...state, playlistData: { name: action.playlist.name, videos: [...action.playlist.data.videos] }, visibleView: 'playlist', ...autoPlay }
        }
        case Actions.REMOVE_PLAYLISTS_ITEM:
            return deletePlaylist(state, action)
        case Actions.RECOMMEND_MOOD:
            return {
                ...state,
                currentRecommendationRequest: { type: 'mood', mood: action.mood }
            }
        case Actions.RECOMMEND_ERROR:
            return {
                ...state,
                currentRecommendationRequest: { type: 'error', message: action.message }
            }
        case Actions.ADD_VIDEO_RECOMMENDATION:
            return addVideoRecommendation(state, action)
        case Actions.TOGGLE_PLAYLIST_SUBMENU:
            return {
                ...state,
                playlistSubmenuVisible: !state.playlistSubmenuVisible
            }
        case Actions.HIDE_PLAYLIST_SUBMENU:
            return {
                ...state,
                playlistSubmenuVisible: false
            }
        case Actions.REMOVE_ALL_NEXT:
            return removeAllNext(state, action)
        case Actions.RESTORE_PLAYLISTS:
            return { ...state, playlists: action.playlists }
        case Actions.RESTORE_STATES:
            let playlistData = action.states.playlist.playlistData
            if (!playlistData.videos) playlistData.videos = []
            return action.states.playlist.playlistData
                ? {
                    ...state,
                    ...getInitialAppState(),
                    playlistData,
                    currentVideoId: action.states.playlist.currentVideoId,
                    current: action.states.playlist.current || {},
                    loadFinished: true
                }
                : { ...state, loadFinished: true }
        default:
            return state
    }
}

if (!usePersistor) appReducers = hookReducer(appReducers, 'playlist', r => { return { playlistData: r.playlistData, currentVideoId: r.currentVideoId, current: r.current } })

export default appReducers