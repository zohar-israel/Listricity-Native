import { Platform, StyleSheet, Dimensions, PixelRatio } from 'react-native'
import Colors from './colors'

export const playlistItemDetailsStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: '5%',
        marginTop: '5%',
        backgroundColor: Colors.background_shadow,
        position: 'absolute',
        width: '90%',
        borderColor: Colors.border_container,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        height: '90%'
    },
    containerTitle: {
        padding: 5
    },
    photo: {
        height: 120,
        width: 120
    },
    title: {
        lineHeight: 20
    },
    scrollView: {
        flex: 1,
        flexDirection: 'column',
    },
    caption: {
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        flex: 1,
        flexDirection: 'row',
        margin: 10,
    },
    captionText: {
        marginLeft: 10,
        color: Colors.text,
        textAlign: 'left'
    },
    descriptionContainer: {
        flex: 1
    },
    description: {
        color: Colors.text_description,
        padding: 15,
        paddingTop: 30,
        lineHeight: 20,
        flex: 1
    },
    actionButton: {
        backgroundColor: Colors.background_details_button,
        height: 60,
        marginTop: 5
    },
    closeButton: {
        backgroundColor: Colors.background,
        height: 60,
        marginBottom: -5,
        marginTop: 5
    },
});
