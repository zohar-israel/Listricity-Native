import { Platform, StyleSheet, Dimensions, PixelRatio } from 'react-native'
import Colors from './colors'

export const playlistStyles = StyleSheet.create({
    itemContainer: {
        //backgroundColor: '#F8F8F8',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor:Colors.border_item,
        borderColor: Colors.background_item,
    },
    listview: { flex: 1 },
    container: {
        flex: 1,
        backgroundColor: Colors.background_dark,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 90,
    },
    actionButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background_action_button,
        borderRightColor: Colors.border_action_button,
        borderRightWidth: 1
    },
    favoriteContainer: { marginRight: 10, width: 40 },
    playNext: { marginTop: -16, color: Colors.tool_text, justifyContent: 'center', fontWeight: 'bold', textAlign: 'center', textShadowColor: Colors.background_blank, textShadowRadius: 2, textShadowOffset: { width: -1, height: -1 } },
    prompt: { color: Colors.text_light },
    emptyContainer: { padding: 20, alignItems: 'center' },
})
