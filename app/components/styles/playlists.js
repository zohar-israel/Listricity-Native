import { Platform, StyleSheet, Dimensions, PixelRatio } from 'react-native'
import Colors from './colors'

export const playlistsStyles = StyleSheet.create({
    itemContainer: {
        padding: 5,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: '#444',
    },
    listview: { flex: 1 },
    container: {
        flex: 1,
        backgroundColor: '#000',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    listItem: { height: 80, flexDirection: 'column', justifyContent: 'center' },
    listItemName: { marginLeft: 80, marginTop: 10 },
    listItemCount: { marginLeft: 80, fontSize: 11, marginTop: -15 },
    listItemButton: { position: 'absolute', right: 0 },
    playlistsPhoto: {
        borderColor: 'black',
        borderWidth: 3,
        height: 40,
        width: 40,
        position: 'absolute',
        borderRadius: 20,
        // backgroundColor: '#000000'
    },
    playlistsPhoto1: { marginLeft: 0, top: 0 },
    playlistsPhoto2: { marginLeft: 20, top: 20 },
    playlistsPhoto3: { marginLeft: 40, top: 40 },

})
