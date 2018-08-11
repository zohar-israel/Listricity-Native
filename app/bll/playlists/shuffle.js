// shuffles the part of the playlist from
// the currenly playing track on
// leaving the tracks before it unchanged

export const shuffle = (state) => {
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
        }
    }
    let currentIndex = state.playlistData.videos.findIndex(e => e.uuid == state.current.uuid)
    if (currentIndex >= state.playlistData.videos.length - 1) return state;
    let unchangedPlaylistData = state.playlistData.videos.slice(0, currentIndex + 1)
    let changedPlaylistData = state.playlistData.videos.slice(currentIndex + 1);
    shuffleArray(changedPlaylistData)
    let shuffledPlaylistData = unchangedPlaylistData.concat(changedPlaylistData)
    return Object.assign({}, state, {
        playlistData: { videos: shuffledPlaylistData },
        playlistSubmenuVisible: false
    })
}