import { Platform, StyleSheet, Dimensions, PixelRatio } from 'react-native'
import Colors from './colors'

export const searchResultsStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    autoSuggest:{ height: 74 },
    autoSuggestContainer: { backgroundColor: '#333' },
    autoSuggestListView: { backgroundColor: '#333' },
    text: {
        marginLeft: 0,
        fontSize: 16,
        padding: 10,
        flex: 1,
        color: '#aaa',
    },
    photo: {
        height: 80,
        width: 80,
        borderRadius: 20,
        backgroundColor: '#000000'
    },

    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,

    },
    containerList: {
        backgroundColor: '#222',
        flex: 1,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#444',
        borderBottomWidth: 1 / PixelRatio.get(),
    },
    listView: { marginTop: 0, flex: 1 },
    addNext: { marginTop: -18, color: '#777', justifyContent: 'center', fontWeight: 'bold', textAlign: 'center', textShadowColor: 'black', textShadowRadius: 2, textShadowOffset: { width: -1, height: -1 } },
    
});