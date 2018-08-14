// Truncates the playlist at the 
// clicked track

export const removeAllNext = (state, action) => {
    let currentIndex = state.playlistData.videos.findIndex(e => e.uuid == action.rowData.uuid)
    var newPlaylistData = state.playlistData.videos.slice(0, currentIndex);
    return {
        ...state,
        playlistData: { ...state.playlistData, videos: newPlaylistData },
        playlistSubmenuVisible: false,
    }
}
