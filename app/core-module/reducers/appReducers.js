import sortBy from 'lodash/sortBy'
import { ListView, Alert } from 'react-native'
import { shufflePlaylist, playNextlistItem } from '../actions'
import { shuffle, remove, next, moveUpPlaylistItem, moveDownPlaylistItem, queueNextPlaylistItem, addVideoRecommendation } from '../../bll/playlists'
import { selectResult } from '../../bll/search'
import { buff } from '../../bll/playlists/buff'
import { toggleFavorite } from '../../bll/playlists/favorite'
import * as Actions from '../actions/ActionTypes'

const appReducers = (state = {
    currentVideoId: false,//'QtXby3twMmI',
    data: [],
    playlistData: { name: '', videos: [], deleted: [] },
    playlists: {},
    // recommendations: {},
    fullscreenOnLandscape: false,
    useLargePlayer: false,
    autoBuffUp: true
}, action) => {
    switch (action.type) {
        case Actions.SAVE_PLAYLIST:
            return {
                ...state,
                playlistData: { ...state.playlistData, name: action.name },
                playlists: {
                    ...state.playlists,
                    [action.name]: { ...state.playlistData, name: action.name }
                },
                playlistSubmenuVisible: false
            };
        case Actions.SHUFFLE_PLAYLIST:
            return shuffle(state)
        case Actions.CLEAR_PLAYLIST:
            return Object.assign({}, state,
                {
                    playlistData: { videos: [] },
                    playlistSubmenuVisible: false
                })
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
            return Object.assign({}, state, { playlistData: { videos: action.playlistData }, currentRecommendationRequest: false })
        case Actions.PLAYLISTS_CHANGED:
            return Object.assign({}, state, { playlists: action.playlistsData })
        case Actions.PLAY_NEXT:
            return next(state)
        case Actions.BUFF_PLAYLIST:
            return buff(state, action)
        case Actions.SELECT_RESULT:
            return selectResult(state, action)
        case Actions.SELECT_GENRE:
            return Object.assign({}, state, {
                currentRecommendationRequest: { type: 'genre', genre: action.genre.title }
            })
        case Actions.SELECT_PLAYLIST_ITEM:
            // console.warn(action.result.id.videoId)
            return Object.assign({}, state, {
                currentVideoId: action.result.id.videoId,
                current: action.result
            })
        case Actions.SELECT_PLAYLISTS_ITEM: {
            let autoPlay = action.playlist.data.videos.length > 0 ? {
                currentVideoId: action.playlist.data.videos[0].id.videoId,
                current: action.playlist.data.videos[0]
            } : {}
            return Object.assign({}, state, { playlistData: { name: action.playlist.name, videos: [...action.playlist.data.videos] }, visibleView: 'playlist' }, autoPlay)
        }
        case Actions.REMOVE_PLAYLISTS_ITEM: {
            let nextPlaylists = Object.assign({}, state.playlists)
            delete nextPlaylists[action.name]
            return nextState = {
                ...state,
                playlists: nextPlaylists
            }
        }
        case Actions.RECOMMEND_MOOD: {
            return Object.assign({}, state, {
                currentRecommendationRequest: { type: 'mood', mood: action.mood }
            })
        }
        case Actions.ADD_VIDEO_RECOMMENDATION:
            return addVideoRecommendation(state, action)
        case Actions.TOGGLE_PLAYLIST_SUBMENU:
            return Object.assign({}, state, {
                playlistSubmenuVisible: !state.playlistSubmenuVisible
            })
        case Actions.HIDE_PLAYLIST_SUBMENU:
            return Object.assign({}, state, {
                playlistSubmenuVisible: false
            })
        case Actions.SET_USER_LARGE_PLAYER:
            return Object.assign({}, state, {
                useLargePlayer: action.useLargePlayer
            })
        case Actions.SET_AUTO_BUFF_UP:
            return Object.assign({}, state, {
                autoBuffUp: action.autoBuffUp
            })
        case Actions.SET_FULLSCREEN_ON_LENDSCAPE:
            return Object.assign({}, state, {
                fullscreenOnLandscape: action.fullscreenOnLandscape
            })
        default:
            return state
    }
}

export default appReducers