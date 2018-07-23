import { next } from '../../bll/playlists/next'

export const remove = (state, action) => {
    var baseState = state
    if (state.current.uuid == action.rowData.uuid) {
        baseState = next(state)
    }
    var newPlaylistData = baseState.playlistData.videos.filter(e => e.uuid != action.rowData.uuid);
    return Object.assign({}, baseState, {
        playlistData: { videos: newPlaylistData },
        playlistSubmenuVisible: false,
        playlistShortcut:'remove',
    })
}
