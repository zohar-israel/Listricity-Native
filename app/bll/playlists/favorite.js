// Toggles a track as favorite (or not) 
// adds it to the automatically maintained favorites playlist
// and saves the updated favorites list 

import config from '../../config'
const usePersistor = config.usePersistor

var RNFS = require('react-native-fs')

export const toggleFavorite = (state, action) => {

    // find the track
    let vid = state.playlistData.videos.find(e => e.uuid == action.rowData.uuid);

    // toggle the favorite flag
    let isFavorite = !vid.favorite
    vid.favorite = isFavorite

    // get the favorites list
    let newFavorites = { ...state.playlists.Favorites }

    // create a saved favorites list 
    // if none exists
    if (!newFavorites || !newFavorites.videos || !Array.isArray(newFavorites.videos)) newFavorites = { name: 'Favorites', videos: [] }

    // Add or remove from the favorites list
    let existingFavorite = newFavorites.videos.find(e => e.id.videoId == vid.id.videoId)
    if (isFavorite && !existingFavorite) {
        newFavorites.videos.push(vid)
    }
    if (!isFavorite && existingFavorite) {
        newFavorites.videos = newFavorites.videos.filter(e => e.id.videoId != vid.id.videoId)
    }
    // Create the new playlists object
    let newPlaylists = { ...state.playlists }

    // Update or add the favorites playlist
    newPlaylists.Favorites = newFavorites

    // Save to persistant storage
    if (!usePersistor) {
        let path = RNFS.DocumentDirectoryPath + '/listricity/playlists'

        RNFS.mkdir(path).then((success) => {
            RNFS.writeFile(path + '/Favorites.listricity', JSON.stringify(newFavorites), 'utf8')
                .then((success) => {
                    // console.warn('Favorites written');
                })
                .catch((err) => {
                    console.warn(err.message);
                });
        }).catch((err) => {
            console.warn(err.message);
        });
    }

    // Return the new state
    return {
        ...state,
        playlistData: {...state.playlistData, videos: [...state.playlistData.videos] },
        playlists: newPlaylists,
        playlistSubmenuVisible: false
    }
}
