import { playlistImported, showPlaylist } from '../../core-module/actions'
import { Alert } from 'react-native';

var RNFS = require('react-native-fs');
export const importPlaylist = async (playlist, store) => {
    try {
        // console.warn('import: ' + playlist);
        // we get either the playlist json or the path
        let content
        if (playlist.indexOf('{') == 0) content = playlist
        else content = await getFile(playlist)

        // console.warn('Importing ' + JSON.parse(content).videos.length + 'tracks')
        let videos = JSON.parse(content).videos
        if (!videos.length) throw 'not a listricity playlist'
        
        // reset favorites, keep as selected 
        videos.map(e => { if (e.favorite) { e.favorite = false; e.selected = true } })

        // confirm
        Alert.alert(
            'Import playlist',
            'Do you want to open this playlist (' + videos.length + ' tracks) ?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Open', onPress: () => {
                        store.dispatch(playlistImported(videos))
                        store.dispatch(showPlaylist())
                    }
                },
            ],
            { cancelable: false }
        )
    }
    catch (e) {
        console.warn('import: ' + e.message)
    }
}

async function getFile(path) {
    let content = await RNFS.readFile(path, 'utf8')
    return content
}