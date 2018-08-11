// Handles saving of playlists detached from the
// global persistance system because playlists 
// are comperativly large and we want to save them
// at very specific times when thery are changed

var RNFS = require('react-native-fs');
export const savePlaylist = (state, action) => {

    let path = RNFS.DocumentDirectoryPath + '/listricity/playlists'
    // console.warn('saving to: ' + path);

    RNFS.mkdir(path).then((success) => {
        // console.warn('folder verified');
        RNFS.writeFile(path + '/' + action.name, JSON.stringify(state.playlistData), 'utf8')
            .then((success) => {
                // console.warn('playlist written');
            })
            .catch((err) => {
                console.warn(err.message);
            });
    }).catch((err) => {
        console.warn(err.message);
    });

    return {
        ...state,
        playlistData: { ...state.playlistData, name: action.name },
        playlists: {
            ...state.playlists,
            [action.name]: { ...state.playlistData, name: action.name }
        },
        playlistSubmenuVisible: false
    };
}