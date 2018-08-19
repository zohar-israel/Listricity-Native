import { Platform, StyleSheet, Dimensions, PixelRatio } from 'react-native'
import baseColors from './colors'

export const getStyle = (Colors, themeName) => StyleSheet.create({
    container: {
        backgroundColor: Colors.background_deep,
        alignSelf: 'stretch',
        flex: 1
    },
    containerMoods: {
        alignSelf: 'stretch',
        backgroundColor: Colors.background_deep,
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
    toolbar: {
        backgroundColor: Colors.ba,
        alignSelf: 'stretch',
        margin: 5,
    },
    toolbarItem: {
        height: 60,
        margin: 5,
    },
    toolbarItemText: {
        color: Colors.text,
        fontSize: 16,
        height: 60,
    }
})

export const moodStyles = getStyle(baseColors)
