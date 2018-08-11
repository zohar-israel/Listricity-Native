import { Platform, StyleSheet, Dimensions, PixelRatio } from 'react-native'
import Colors from './colors'

export const moodStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background_dark,
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
        backgroundColor: Colors.background,
    },
    subTree: {
        marginLeft: 20,
    },
    itemText: {
        color: Colors.text,
        fontSize: 16,
        height: 50,
        paddingTop: 14,
        justifyContent: 'center'
    },
    moreContainer: {
        marginRight: 5,
        alignSelf: 'flex-end',
        marginLeft: 'auto',
        backgroundColor: Colors.background_button,
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
