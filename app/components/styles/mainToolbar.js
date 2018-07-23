import { Platform, StyleSheet, Dimensions, PixelRatio } from 'react-native'
import Colors from './colors'

export const mainToolbarStyles = StyleSheet.create({
    container: {
        height: 121,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    toolsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        width: Dimensions.get('window').width - 225,
    },
    text: { color: '#fff', height: 36 },
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
        marginLeft: 20,
    },
    toolbarHomeItem: {
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        marginRight: 20,
    },
    videoContainer: {
        alignSelf: 'center', height: 120, width: 200
        , position: 'absolute', right: 0, top: 0
        , backgroundColor: 'black'
    },
    video: { alignSelf: 'center', height: 120, width: 200 },
    statusIcon: { marginLeft: -16 },
    background: { position: 'absolute', height: 120, width: Dimensions.get('window').width },
    row: { flexDirection: 'row' },
})
