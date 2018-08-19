import { Platform, StyleSheet, Dimensions, PixelRatio } from 'react-native'
import baseColors from './colors'

export const getStyle = (Colors, themeName) => StyleSheet.create({
    itemContainer: {
        //backgroundColor: '#F8F8F8',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: Colors.border_item,
        borderColor: Colors.background_item,
    },
    listview: { flex: 1 },
    container: {
        flex: 1,
        backgroundColor: Colors.background_deep,
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
    playNext: { fontSize: 12, marginTop: -14, color: Colors.tool_text, justifyContent: 'center', fontWeight: 'bold', textAlign: 'center', textShadowColor: Colors.shadow_action_button, textShadowRadius: 2, textShadowOffset: { width: -1, height: -1 } },
    prompt: { color: Colors.text_caption },
    emptyContainer: { padding: 20, alignItems: 'center' },
})

export const playlistStyles = getStyle(baseColors)
