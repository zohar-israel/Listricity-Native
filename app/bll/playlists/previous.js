// Plays the previous track
// occures only on clicking back button

export const previous = (state) => {
    let closeToEnd = false;
    if (state.playlistData.videos.length == 0)
        return {
            ...state,
            playlistSubmenuVisible: false
        }
    let nextIndex = state.playlistData.videos.findIndex(e => e.uuid == state.current.uuid) - 1
    if (nextIndex == -1) nextIndex = state.playlistData.videos.length - 1
    let nextVideo = state.playlistData.videos[nextIndex]
    return {
        ...state,
        currentVideoId: nextVideo.id.videoId,
        current: nextVideo,
        closeToEnd,
        playlistSubmenuVisible: false
    }
}
