// Deletes a playlist from the saved playlists 
// and saves the change 

var RNFS = require('react-native-fs');
export const deletePlaylist = (state, action) => {

    try {
        let path = RNFS.DocumentDirectoryPath + '/listricity/playlists' + '/' + action.name
        console.warn('delete: ' + path);

        RNFS.unlink(path)
            .then(() => {
                console.warn('playlist backup deleted');
            })
            .catch((err) => {
                console.warn(err.message);
            });
    }
    catch (e) {
        console.warn(e.message)
    }
    let nextPlaylists = { ...state.playlists }
    delete nextPlaylists[action.name]
    return {
        ...state,
        playlists: nextPlaylists
    }
}