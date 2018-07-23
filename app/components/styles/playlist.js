import { Platform, StyleSheet, Dimensions, PixelRatio } from 'react-native'
import Colors from './colors'

export const playlistStyles = StyleSheet.create({
    itemContainer: {
        //backgroundColor: '#F8F8F8',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: '#444',
    },
    listview: { flex: 1 },
    container: {
        flex: 1,
        backgroundColor: '#000',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 90,
    },
    actionButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#444',
        borderRightColor: '#000',
        borderRightWidth: 1
    },
    favoriteContainer: { marginRight: 10, width: 40 },
    playNext: { marginTop: -16, color: '#777', justifyContent: 'center', fontWeight: 'bold', textAlign: 'center', textShadowColor: 'black', textShadowRadius: 2, textShadowOffset: { width: -1, height: -1 } },
    prompt: { color: 'white' },
    emptyContainer: { padding: 50, alignItems: 'center' },
})
