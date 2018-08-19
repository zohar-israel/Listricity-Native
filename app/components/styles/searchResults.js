import { Platform, StyleSheet, Dimensions, PixelRatio } from 'react-native'
import baseColors from './colors'

export const getStyle = (Colors, themeName) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background_search_results,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    header: {
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: Colors.background,
        flexDirection: 'row',
        height: 50,
        padding: 5,
        paddingLeft: 15,
        justifyContent: 'flex-start'
    },
    headerText: {
        marginLeft: 5,
        fontSize: 16,
        padding: 10,
        flex: 1,
        color: Colors.text_main,
        lineHeight: 22,
        height: 44,
    },
    autoSuggest: { height: 74 },
    autoSuggestContainer: { backgroundColor: Colors.background },
    autoSuggestListView: { backgroundColor: Colors.background },
    textInputContainer: {
        backgroundColor: Colors.background_deep,
        borderTopColor: Colors.border_search_results,
        borderBottomColor: Colors.border_search_results,
    }, suggestion: {
        fontWeight: 'bold',
        color: Colors.text,
        paddingLeft: 10
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.border_search_results,
    },
    // text: {
    //     marginLeft: 0,
    //     fontSize: 16,
    //     padding: 10,
    //     flex: 1,
    //     color: Colors.text_main,
    // },
    // photo: {
    //     height: 80,
    //     width: 80,
    //     borderRadius: 20,
    //     backgroundColor: Colors.photo_background
    // },

    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,

    },
    containerList: {
        backgroundColor: Colors.background_item,
        flex: 1,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: Colors.border_item,
    },
    listView: { marginTop: 0, flex: 1 },
    addNext: { fontSize: 12, marginTop: -14, color: Colors.tool_text, justifyContent: 'center', fontWeight: 'bold', textAlign: 'center', textShadowColor: Colors.background_blank, textShadowRadius: 2, textShadowOffset: { width: -1, height: -1 } },

});

export const searchResultsStyles = getStyle(baseColors)
