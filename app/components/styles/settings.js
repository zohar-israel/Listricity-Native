import { Platform, StyleSheet, Dimensions, PixelRatio } from 'react-native'
import Colors from './colors'

export const settingsStyles = StyleSheet.create({
    pageContainer: {
        backgroundColor: '#111',
        flex: 1
    },
    pageSubContainer: {
        flex: 1,
        marginTop: 50
    },
    headerStyle: {
        color: 'white'
    },
    title: {
        color: '#eee'
    },
    titleInfo: {
        width: 130,
        padding: 10,
        margin: 0
    },
    modalContainer: {
        backgroundColor: '#111',
        flex: 1,
        borderTopColor: '#777',
        borderTopWidth: 1
    },
    modalCloseButton: {
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#222',
        flexDirection: 'row',
        height: 60,
        justifyContent: 'center'
    }
})
