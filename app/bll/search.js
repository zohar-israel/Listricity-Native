// Implements the reducer function for
// when a search result is selected

import generateUUID from './uuid'
export const selectResult = (state, action) => {
    let uuid = generateUUID()
    action.result.uuid = uuid

    // Mark the track as manually selected 
    // so it is prefered for probing and 
    // buffing 
    action.result.selected = true
    let play = !state.currentVideoId
    let current = action.result
    let pld
    // flag options are:
    // empty:   add the track and play it only if there is no track playing
    // play:    add the track and start playing it
    // addnext: add the track after the currently playing track
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
        return {
            ...state,
            currentVideoId: action.result.id.videoId,
            playlistData: { ...state.playlistData, videos: pld },
            current,
            playlistSubmenuVisible: false
        }
    } else {
        return {
            ...state,
            playlistData: { ...state.playlistData, videos: pld },
            playlistSubmenuVisible: false
        }
    }
}
