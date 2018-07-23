import { Platform, StyleSheet, Dimensions, PixelRatio } from 'react-native'
import Colors from './colors'

export const moodStyles = StyleSheet.create({
    container: {
        backgroundColor: '#111',
        alignSelf: 'stretch',
        flex: 1
    },
    containerMoods: {
        alignSelf: 'stretch',
        backgroundColor: Colors.background_dark,
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
    toolbar: {
        backgroundColor: '#333',
        alignSelf: 'stretch',
        margin: 5,
    },
    toolbarItem: {
        height: 60,
        margin: 5,
    },
    toolbarItemText: {
        color: '#eee',
        fontSize: 16,
        height: 60,
    }
});

export const moodItemsStyles = StyleSheet.create({
    listContainer: {
        alignSelf: 'stretch',
    },
    nodeContainer: {
        alignSelf: 'stretch',
        marginTop: 5,
    },
    contentContainer: {
        alignSelf: 'stretch',
        padding: 5,
        paddingRight: 0,
        flexDirection: 'row',
        backgroundColor: '#333',
    },
    subTree: {
        marginLeft: 20,
    },
    itemText: {
        color: '#eee',
        fontSize: 16,
        height: 50,
        paddingTop: 14,
        justifyContent: 'center'
    },
    moreContainer: {
        marginRight: 5,
        alignSelf: 'flex-end',
        marginLeft: 'auto',
        backgroundColor: '#aaa',
        borderRadius: 5,
        padding: 5,

    },
    moreButton: {
        // width: 40,
        // height: 40,
        // marginRight: 5,
        alignSelf: 'flex-end',
        marginLeft: 'auto',
    },
    thumbnail: {
        width: 50,
        height: 50,
        marginRight: 10,
    }
});
