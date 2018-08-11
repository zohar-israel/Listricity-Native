// Appands track recommendations to a video
// in the playlist, those recommendations will
// be used to buff up the list when required

export const addVideoRecommendation = (state,action) => {
    if (state.playlistData) {
        state.playlistData.videos.forEach(e => {
            if (e.id.videoId === action.recommendation.receivedVideoId
            ) {
                if (!e.recommendations) e.recommendations = [];
                e.recommendations = e.recommendations.concat(action.recommendation.newVids)
                e.researched = true
            }
        })
    }
    return Object.assign({}, state, { currentRecommendationRequest: false })
}
