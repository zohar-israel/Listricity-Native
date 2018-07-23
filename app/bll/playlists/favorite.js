export const toggleFavorite = (state, action) => {
    let vid = state.playlistData.videos.find(e => e.uuid == action.rowData.uuid);
    vid.favorite = !vid.favorite
    // if (!state.playlists.Favorites || !state.playlists.Favorites.videos) state.playlists.Favorites = { name: 'Favorites', videos: [] }
    let newFavorites = Object.assign({}, state.playlists.Favorites)
    if (!newFavorites || !newFavorites.videos || !Array.isArray(newFavorites.videos)) newFavorites = { name: 'Favorites', videos: [] }

    // console.warn(newFavorites)
    let existingFavorite = newFavorites.videos.find(e => e.id.videoId == vid.id.videoId)
    if (vid.favorite && !existingFavorite)
        newFavorites.videos.push(vid)
    if (!vid.favorite && existingFavorite)
        newFavorites.videos = newFavorites.videos.filter(e => e.id.videoId != vid.id.videoId)

    // let newPlaylists = { Favorites: { videos: [...state.playlists['Favorites'].videos] } }
    let newPlaylists = Object.assign({}, state.playlists);//, { playlists: { Favorites: newFavorites } })
    newPlaylists.Favorites = newFavorites
    return Object.assign({}, state, {
        playlistData: { videos: [...state.playlistData.videos] },
        playlists: newPlaylists,
        playlistSubmenuVisible: false
    })
}
