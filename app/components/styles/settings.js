import { Platform, StyleSheet, Dimensions, PixelRatio } from 'react-native'
import Colors from './colors'

export const settingsStyles = StyleSheet.create({
    pageContainer: {
        backgroundColor: Colors.background_dark,
        flex: 1
    },
    pageSubContainer: {
        flex: 1,
        marginTop: 50
    },
    headerStyle: {
        color: Colors.text_light
    },
    title: {
        color: Colors.text
    },
    titleInfo: {
        width: 130,
        padding: 10,
        margin: 0
    },
    modalContainer: {
        backgroundColor: Colors.background_dark,
        flex: 1,
        borderTopColor: Colors.border_submenu_text,
        borderTopWidth: 1
    },
    modalCloseButton: {
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: Colors.background_item,
        flexDirection: 'row',
        height: 60,
        justifyContent: 'center'
    }
})
