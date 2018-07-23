import generateUUID from './uuid'
export const selectResult = (state, action) => {
    let uuid = generateUUID()
    action.result.uuid = uuid
    action.result.selected = true
    let play = !state.currentVideoId
    let current = action.result
    let pld
    if (action.flag) {
        pld = [...state.playlistData.videos]
        let currentIndex = pld.findIndex(e => e.uuid == state.current.uuid)
        if (pld.findIndex(e => e.id.videoId == action.result.id.videoId) == -1) {
            pld.splice(currentIndex + 1, 0, action.result)
        }
        else if (action.flag === 'play') {
            current = pld.find(e => e.id.videoId == action.result.id.videoId)
        }
        if (action.flag === 'play') play = true
    }
    else {
        pld = [...state.playlistData.videos, action.result]
    }
    if (play) {
        return Object.assign({}, state, {
            currentVideoId: action.result.id.videoId,
            playlistData: { videos: pld },
            current,
            playlistSubmenuVisible: false
        })
    } else {
        return Object.assign({}, state, {
            playlistData: { videos: pld },
            playlistSubmenuVisible: false
        })
    }
}
