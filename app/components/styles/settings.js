import { Platform, StyleSheet, Dimensions, PixelRatio } from 'react-native'
import baseColors from './colors'

export const getStyle = (Colors, themeName) => StyleSheet.create({
    pageContainer: {
        backgroundColor: Colors.background_deep,
        flex: 1
    },
    pageSubContainer: {
        flex: 1,
        marginTop: 0
    },
    headerStyle: {
        color: Colors.text_caption,

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
        backgroundColor: Colors.background_deep,
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

export const settingsStyles = getStyle(baseColors)
