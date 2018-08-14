// Adds tracks to the playlist using the recommendations
// appended to the tracks in the list

import { existsInPlaylist, existsInArrays } from '../unique'

export const buff = (state, action) => {
    let buffedState = {};

    // Only buff playlist on explicit request 
    // or if the playlist is shorter than 100 tracks
    if (state.playlistData.videos
        && (action.buffLimit > 1 || state.playlistData.videos.length < 100)
    ) {

        // Create and populate prioritized arrays of 
        // recommendations, favorited or added from search 
        // tracks are prefered
        let candidates = []
        let upcandidates = []
        state.playlistData.videos.forEach(e => {
            if (e.recommendations) {
                e.recommendations.forEach(r => {

                    // Try to avoid identical or duplicaed tracks
                    // by measuring resemblance of titles
                    if (!r.id || r.duplicated
                        || existsInPlaylist(r, state.playlistData.videos)
                        || existsInArrays(r, upcandidates, candidates)
                    ) {
                        r.duplicated = true;
                    }
                    else {
                        if (r.favorite || r.selected || r.type == 'up')
                            upcandidates.push(r);
                        else
                            candidates.push(r);
                    }
                })
            }
        })

        shuffleArray(candidates)
        shuffleArray(upcandidates)
        var buffs = []
        let buffLimit = action.buffLimit;

        // Use the preferred tracks first
        upcandidates.forEach(c => {
            if (buffs.length < buffLimit
                && state.playlistData.videos.findIndex(e => e.id.videoId === c.id.videoId) == -1)
                buffs.push(c)
        })

        // If preferred tracks are exhosted
        // use the regular recommendations
        if (buffs.length < buffLimit) {
            candidates.forEach(c => {
                if (buffs.length < buffLimit
                    && state.playlistData.videos.findIndex(e => e.id.videoId === c.id.videoId) == -1)
                    buffs.push(c)
            })
        }

        if (buffs.length > 0) {
            var newVids = []
            buffs.forEach(e => {
                e.uuid = generateUUID();
                e.used = true
                newVids.push(e)
            })

            // Remove the used recommendations 
            // and recommendations that were found to be
            // duplicates of existing tracks
            state.playlistData.videos.forEach(e => {
                if (e.recommendations) {
                    e.recommendations = e.recommendations.filter(r => !r.duplicated && !r.used)
                }
            })

            // createt and return the new playlistData.videos array
            let pld = [...state.playlistData.videos, ...newVids];
            return {
                ...state,
                playlistData: { ...state.playlistData, videos: pld },
                playlistSubmenuVisible: false,
                buffedTime: buffLimit == 1 ? false : new Date()
            }
        }
    }
    return {
        ...state,
        playlistSubmenuVisible: false
    }
}

shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
