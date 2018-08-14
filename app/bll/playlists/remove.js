// Deletes a track from the playlist

import { next } from '../../bll/playlists/next'

export const remove = (state, action) => {
    var baseState = state
    if (state.current.id.videoId == action.rowData.id.videoId) {
        baseState = next(state)
    }
    var newPlaylistData = baseState.playlistData.videos.filter(e => e.id.videoId != action.rowData.id.videoId);
    return {
        ...baseState,
        playlistData: { ...state.playlistData, videos: newPlaylistData },
        playlistSubmenuVisible: false,
        playlistShortcut: 'remove',
    }
}
