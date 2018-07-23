import { existsInPlaylist, existsInArrays } from '../unique'

export const buff = (state, action) => {
    let buffedState = {};
    if (state.playlistData.videos) {
        let candidates = []
        let upcandidates = []
        state.playlistData.videos.forEach(e => {
            if (e.recommendations) {
                e.recommendations.forEach(r => {
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
        let buffLimit = 2;
        upcandidates.forEach(c => {
            if (buffs.length < buffLimit
                && state.playlistData.videos.findIndex(e => e.id.videoId === c.id.videoId) == -1)
                buffs.push(c)
        })
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

            state.playlistData.videos.forEach(e => {
                if (e.recommendations) {
                    e.recommendations = e.recommendations.filter(r => !r.duplicated && !r.used)
                }
            })
            let pld = [...state.playlistData.videos, ...newVids];// {id:action.result.id.videoId,title:action.result.id.videoId}]
            return Object.assign({}, state, {
                playlistData: { videos: pld },
                playlistSubmenuVisible: false
            })
        }
    }
    return Object.assign({}, state, {
        playlistSubmenuVisible: false
    })
}

shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
    }
}
