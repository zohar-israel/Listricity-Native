// Load states and playlists from
// persistant storage
// occures on application load

import { restoreStates, restorePlaylists } from '../../core-module/actions'
var RNFS = require('react-native-fs');

// Load saved states from backup
export const loadFromBackup = (store) => {
    let path = RNFS.DocumentDirectoryPath + '/listricity/states'
    let states = {}

    // console.warn('getting: ' + path)
    RNFS.readDir(path)
        .then((result) => {
            return Promise.all(result);
        })
        .then(async (statResult) => {
            for (var i = 0; i < statResult.length; i++) {
                // console.warn('getting: ' + statResult[i].path)
                try {
                    let name = statResult[i].path.replace(path + '/', '')
                    let content = await RNFS.readFile(statResult[i].path, 'utf8')

                    let state = JSON.parse(content)
                    states[name] = state
                    // console.warn('Restored: ' + name + JSON.stringify(state))
                }
                catch (e) {
                    console.warn('err: ' + e.message)
                }
            }
            if (!states.playlist) states.playlist = { playlistData: { name: '', videos: [], deleted: [] } }

            // Close the loading screen before loading the playlists
            // unless it is the last open screen
            if (states.flow && states.flow.visibleView !== 'playlists') { 
                store.dispatch(restoreStates(states))
                possiblyLoadFromBackup(store, true)
            }
            else {
                possiblyLoadFromBackup(store, true, () => store.dispatch(restoreStates(states)))
            }
            // console.warn('Restore finished')
        })
        .catch((err) => {
            console.warn('states:' + err.message, err.code);
            if (!states.playlist) states.playlist = { playlistData: { name: '', videos: [], deleted: [] } }
            possiblyLoadFromBackup(store, true, () => store.dispatch(restoreStates(states)))
        })

}

// Load saved playlists from backup
// this is handled seperatly since 
// this part of the state is relativly big
// and is saved only when a playlist 
// is saved or deleted
export const possiblyLoadFromBackup = (store, force, callback) => {

    // skip if store loaded successfully
    // and persistStore is used
    if (!force && (store.getState()
        && store.getState().appReducers
        && store.getState().appReducers.playlists
        && (store.getState().appReducers.currentVideoId
            || Object.keys(store.getState().appReducers.playlists).length > 0))) return

    // console.warn('Restoring playlists from backup')

    let path = RNFS.DocumentDirectoryPath + '/listricity/playlists'
    RNFS.readDir(path)
        .then((result) => {
            return Promise.all(result);
        })
        .then(async (statResult) => {
            let playlists = {}
            for (var i = 0; i < statResult.length; i++) {
                try {
                    let name = statResult[i].path.replace(path + '/', '')
                    let content = await RNFS.readFile(statResult[i].path, 'utf8')

                    let playlist = JSON.parse(content)
                    playlists[name] = playlist
                    // console.warn('Restored: ' + name)
                }
                catch (e) {
                    console.warn('err: ' + e.message)
                }
            }
            if (callback) callback()

            store.dispatch(restorePlaylists(playlists))
            // console.warn('Restore finished ' + playlists)
        })
        .catch((err) => {
            console.warn('playlists: ' + err.message, err.code);
            if (callback) callback()
            store.dispatch(restorePlaylists({}))
        })

}
