import { Platform, StyleSheet, Dimensions, PixelRatio } from 'react-native'
import baseColors from './colors'

export const getStyle = (Colors, themeName) => StyleSheet.create({
    container: {
        // height: 121,
        flexDirection: 'row',
        // justifyContent: 'flex-start',
        justifyContent: 'space-between',
        // padding: 10,
        paddingRight: 0,
        paddingLeft: 0,
        // paddingTop:11,
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: Colors.background_toolbar,
    },
    toolsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        width: Dimensions.get('window').width - 225,
        paddingLeft: 10,
    },
    text: { color: Colors.text, height: 36 },
    toolsRow: {
        width: Dimensions.get('window').width - 225,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        height: 54
    },
    logo: { height: 60 },
    button: { width: 40 },
    toolbarItem: {
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        marginLeft: 15,
    },
    toolbarHomeItem: {
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        marginRight: 15,
    },
    videoContainer: {
        alignSelf: 'center', height: 120, width: 200
        // , position: 'absolute', right: 0, top: 0
        , backgroundColor: Colors.background_blank
    },
    video: { alignSelf: 'center', height: 120, width: 200 },
    statusIcon: { marginLeft: -16, marginTop: 2 },
    controlsIcon: { padding: 7, paddingTop: 6 },
    background: {
        position: 'absolute', height: 120, width: 384 //, opacity: (themeName == 'Dark' || !themeName) ? 1 : .6 
    },
    row: { flexDirection: 'row' },
})

export const mainToolbarStyles = getStyle(baseColors)
