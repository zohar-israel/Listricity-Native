// Moves a track to after the 
// currently playing track

export const queueNextPlaylistItem = (state, action) => {
    var baseState = state
    var newPlaylistData = [...baseState.playlistData.videos]
    var rowItem = newPlaylistData.find(e => e.uuid == action.rowData.uuid);
    var newPlaylistData = newPlaylistData.filter(e => e.uuid != action.rowData.uuid);
    let currentIndex = newPlaylistData.findIndex(e => e.uuid == state.current.uuid)
    newPlaylistData.splice(currentIndex + 1, 0, rowItem)
    return {
        ...baseState,
        playlistData: { ...state.playlistData, videos: newPlaylistData },
        playlistSubmenuVisible: false,
        playlistShortcut: 'queueNext'
    }
}
