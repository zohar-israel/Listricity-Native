import * as Actions from './ActionTypes'

export const selectGenre = (genre) => {
    return {
        type: Actions.SELECT_GENRE,
        genre: genre
    }
}

export const selectResult = (result, flag) => {
    return {
        type: Actions.SELECT_RESULT,
        result,
        flag
    }
}

export const showGenres = () => {
    return {
        type: Actions.SHOW_GENRES
    }
}

export const showPlaylist = () => {
    return {
        type: Actions.SHOW_PLAYLIST
    }
}

export const togglePlaylistSubmenu = () => {
    return {
        type: Actions.TOGGLE_PLAYLIST_SUBMENU
    }
}

export const hidePlaylistSubmenu = () => {
    return {
        type: Actions.HIDE_PLAYLIST_SUBMENU
    }
}

export const showPlaylists = () => {
    return {
        type: Actions.SHOW_PLAYLISTS
    }
}

export const showSearchResults = () => {
    return {
        type: Actions.SHOW_SEARCH_RESULTS
    }
}

export const showResults = (kind = 'search', phrase = '', videoId) => {
    return {
        type: Actions.SHOW_RESULTS,
        kind,
        phrase,
        videoId
    }
}

export const showMoods = () => {
    return {
        type: Actions.SHOW_MOODS
    }
}

export const showHome = () => {
    return {
        type: Actions.SHOW_HOME
    }
}

export const showSettings = () => {
    return {
        type: Actions.SHOW_SETTINGS
    }
}

export const showArrangablePlaylist = () => {
    return {
        type: Actions.SHOW_ARRANGABLE_PLAYLIST
    }
}

export const selectPlaylistItem = (result) => {
    return {
        type: Actions.SELECT_PLAYLIST_ITEM,
        result
    }
}

export const selectPlaylistsItem = (playlist) => {
    return {
        type: Actions.SELECT_PLAYLISTS_ITEM,
        playlist
    }
}

export const playNextlistItem = () => {
    return {
        type: Actions.PLAY_NEXT,
    }
}

export const playPreviouslistItem = () => {
    return {
        type: Actions.PLAY_PREVIOUS,
    }
}

export const buffPlaylist = (buffLimit = 3) => {
    return {
        type: Actions.BUFF_PLAYLIST,
        buffLimit
    }
}

export const playlistChanged = (playlistData) => {
    return {
        type: Actions.PLAYLIST_CHANGED,
        playlistData
    }
}

export const removePlaylistItem = (rowData) => {
    return {
        type: Actions.REMOVE_PLAYLIST_ITEM,
        rowData
    }
}


export const moveUpPlaylistItem = (rowData) => {
    return {
        type: Actions.MOVE_UP_PLAYLIST_ITEM,
        rowData
    }
}
export const moveDownPlaylistItem = (rowData) => {
    return {
        type: Actions.MOVE_DOWN_PLAYLIST_ITEM,
        rowData
    }
}

export const queueNextPlaylistItem = (rowData) => {
    return {
        type: Actions.QUEUE_NEXT_PLAYLIST_ITEM,
        rowData
    }
}

export const toggleFavoriteItem = (rowData) => {
    return {
        type: Actions.TOGGLE_FAVORITE_ITEM,
        rowData
    }
}

export const playlistsChanged = (playlistsData) => {
    return {
        type: Actions.PLAYLISTS_CHANGED,
        playlistsData
    }
}

export const removePlaylistsItem = (name) => {
    return {
        type: Actions.REMOVE_PLAYLISTS_ITEM,
        name
    }
}

export const viewPlaylistsItem = (name) => {
    return {
        type: Actions.VIEW_PLAYLISTS_ITEM,
        name
    }
}

export const savePlaylist = (name) => {
    return {
        type: Actions.SAVE_PLAYLIST,
        name
    }
}

export const restorePlaylists = (playlists) => {
    return {
        type: Actions.RESTORE_PLAYLISTS,
        playlists
    }
}

export const restoreStates = (states) => {
    return {
        type: Actions.RESTORE_STATES,
        states
    }
}

export const shufflePlaylist = () => {
    return {
        type: Actions.SHUFFLE_PLAYLIST,
    }
}

export const clearPlaylist = () => {
    return {
        type: Actions.CLEAR_PLAYLIST,
    }
}

export const recommendMood = (mood) => {
    return {
        type: Actions.RECOMMEND_MOOD,
        mood
    }
}

export const recommendError = (message) => {
    return {
        type: Actions.RECOMMEND_ERROR,
        message
    }
}

export const setFullscreenOnLandscape = (fullscreenOnLandscape) => {
    return {
        type: Actions.SET_FULLSCREEN_ON_LENDSCAPE,
        fullscreenOnLandscape
    }
}

export const setUseLargePlayer = (useLargePlayer) => {
    return {
        type: Actions.SET_USER_LARGE_PLAYER,
        useLargePlayer
    }
}

export const setAutoBuffUp = (autoBuffUp) => {
    return {
        type: Actions.SET_AUTO_BUFF_UP,
        autoBuffUp
    }
}

export const addVideoRecommendation = (recommendation) => {
    return {
        type: Actions.ADD_VIDEO_RECOMMENDATION,
        recommendation
    }
}

export const removeAllNext = (rowData) => {
    return {
        type: Actions.REMOVE_ALL_NEXT,
        rowData
    }
}

export const networkStatus = (isConnected) => {
    return {
        type: Actions.NETWORK_STATUS,
        isConnected
    }
}

