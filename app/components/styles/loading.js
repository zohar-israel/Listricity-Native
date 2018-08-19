import { Platform, StyleSheet, Dimensions, PixelRatio } from 'react-native'
import baseColors from './colors'

export const getStyle = (Colors, themeName) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicator: {},
    text: {
        fontSize: 16,
        padding: 10,
        color: Colors.tool_text,
    },
    splashIndicator: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200

    },
    splashBackground: {
        backgroundColor: Colors.background_blank,
        position: 'absolute',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    splashFooterContainer: {
        height: 40,
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    splashFooterText: {
        color: "#444",
        textAlign: 'right'
    }
})

export const loadingStyles = getStyle(baseColors)
