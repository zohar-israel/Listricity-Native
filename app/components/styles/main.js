import { Platform, StyleSheet, Dimensions, PixelRatio } from 'react-native'
import Colors from './colors'

export { moodStyles, moodItemsStyles } from './moods'
export { homeStyles } from './home'
export { loadingStyles } from './loading'
export { mainToolbarStyles } from './mainToolbar'
export { playlistStyles } from './playlist'
export { playlistsStyles } from './playlists'
export { searchResultsStyles } from './searchResults'
export { settingsStyles } from './settings'
export { arrangablePlaylistStyles } from './arrangablePlaylist'
export { playlistItemDetailsStyles } from './playlistItemDetailsStyles'

export default StyleSheet.create({
    visible: {
        width: '100%',
        flex: 1
    },
    full: {
        flex: 1
    },
    hidden: {
        flex: 0,
        height: 0,
        opacity: 0
    },
    cell: {
        alignItems: 'center',
        margin: 5,
        height: 190,
        width: 160,
    },
    cellTitle: {
        color: Colors.text,
        //fontFamily: 'FiraSans-Regular',
        fontSize: 16,
        marginTop: 5
    },
    container: {
        width: '100%',
        backgroundColor: Colors.background_dark,
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
    grid: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    modal: {
        backgroundColor: Colors.background_dark,
        flex: 1,
        opacity: 0.9
    },
    thumbnail: {
        height: 150,
        width: 150
    },
    toolbar: {
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: Colors.background,
        flexDirection: 'row',
        height: 60,
        justifyContent: 'flex-end'
    },
    toolbarItem: {
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 10
    },
    toolbarItemText: {
        color: Colors.text,
        fontSize: 16,
        // fontFamily: 'FiraSans-Bold',
        marginRight: 10
    },
    toolbarMenu: { alignSelf: 'flex-start', flex: 1 },
    submenuContainer: {
        position: 'absolute',
        bottom: 60,
    },
    submenu: {
        padding: 0,
        backgroundColor: Colors.background_submenu,
        borderColor: Colors.border_submenu,
        borderWidth: 1,
        // width: 150
    },
    submenuItemText: {
        alignSelf: 'flex-start',
        color: Colors.text,
        fontSize: 16,
        padding: 5,
        marginRight: 10,
        marginLeft: 10,
        // borderBottomWidth: 1 / PixelRatio.get(),
        // borderColor: Colors.border_submenu_text,
    },
    submenuItem: {
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: Colors.border_submenu,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        flex: 1,
        flexDirection: 'row',
        padding: 10
    },
    submenuIcon: {
        alignItems: 'center',
        // alignSelf: 'center',
        // flex: 1,
        width: 20,
    },
    homeItem: {
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column',
        margin: 10,
        marginTop: 30,
    },
    homeItemText: {
        color: Colors.text,
        fontSize: 16,
        // fontFamily: 'FiraSans-Bold',
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'center'
    },
    text: {
        marginLeft: 0,
        fontSize: 12,
        padding: 10,
        flex: 1,
        lineHeight: 21,
        color: Colors.text_dark,
    },
    textItemHeight: { maxHeight: 80 },
    photo: {
        height: 80,
        width: 80,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.background_blank,
        backgroundColor: Colors.photo_background,
    },

    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,

    },
    containerList: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listIcon: { alignSelf: 'flex-end', paddingLeft: 10, paddingRight: 10 },
    listLastIcon: { alignSelf: 'flex-end' },
    deleteIcon: { alignSelf: 'flex-end' },
    favoriteIcon: { alignSelf: 'center' },
    smallButton: { width: 50, height: 60 },
    longText: { lineHeight: 25 },
    headerText: { fontWeight: 'bold' },
    toolbarBackground: { position: 'absolute', height: 70, width: Dimensions.get('window').width },
    toolbarMessage: { alignItems: 'flex-start', alignSelf: 'center', flex: 1 },
    menuIcon: { alignItems: 'flex-start', alignSelf: 'flex-start', flex: 1 },
    modalBackground: {
        position: 'absolute', height: Dimensions.get('window').height - 300, width: Dimensions.get('window').width
    },
    iconColor: { color: Colors.icon },
    modalText: { color: Colors.text, padding: 5 },
    modalContainer: { padding: 10 },
    link: { color: Colors.text_link },

});

