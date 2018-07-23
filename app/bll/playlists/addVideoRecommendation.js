
export const addVideoRecommendation = (state,action) => {
    if (state.playlistData) {
        state.playlistData.videos.forEach(e => {
            if (e.id.videoId === action.recommendation.receivedVideoId
                // && (!e.recommendations
                //     || e.recommendations.findIndex(r => r.vid.id === action.recommendation.id) === -1)
            ) {
                if (!e.recommendations) e.recommendations = [];
                // ? [...e.recommendations, ...action.recommendation]
                // : [...action.recommendation]
                e.recommendations = e.recommendations.concat(action.recommendation.newVids)
                e.researched = true
            }
        })
    }
    return Object.assign({}, state, { currentRecommendationRequest: false })
    // if(!action.recommendation.receivedVideoId) Alert.alert('',action);

    //            let existing = state.recommendations.find(e=>e.vid.id.videoId ===action.recommendation.receivedVideoId);
    let existing = state.recommendations ? state.recommendations[action.recommendation.receivedVideoId] : []
    if (!existing) existing = []

    let updated = [...existing, ...action.recommendation.newVids];
    return Object.assign({}, state, {
        recommendations: {
            ...state.recommendations, [action.recommendation.receivedVideoId]:
                updated
        },
        currentRecommendationRequest: false
    })
}
