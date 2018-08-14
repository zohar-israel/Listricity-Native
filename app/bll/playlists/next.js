// Play the next playlist item
// occures on user request
// when a track is played till the end
// or when a track fails to play

export const next = (state) => {
    let closeToEnd = false;
    if (state.playlistData.videos.length == 0)
        return {
            ...state,
            playlistSubmenuVisible: false
        }
    let nextIndex = state.playlistData.videos.findIndex(e => e.uuid == state.current.uuid) + 1
    if (nextIndex >= state.playlistData.videos.length - 2) closeToEnd = true
    if (nextIndex == state.playlistData.videos.length) nextIndex = 0
    let nextVideo = state.playlistData.videos[nextIndex]
    return {
        ...state,
        currentVideoId: nextVideo.id.videoId,
        current: nextVideo,
        closeToEnd,
        playlistSubmenuVisible: false
    }
}
