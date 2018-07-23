import { Platform, StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');


export const arrangablePlaylistStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        ...Platform.select({
            ios: {
                paddingTop: 0,
            },
        }),
    },


    contentContainer: {
        width: window.width,
        backgroundColor: '#111',
        ...Platform.select({
            ios: {
                paddingHorizontal: 30,
            },

            android: {
                paddingHorizontal: 0,
            }
        })
    },

    row: {
        flexDirection: 'row',
        padding: 0,
        height: 90,
        flex: 1,
        marginTop: 0,
        marginBottom: 0,
        borderRadius: 4,


        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.2)',
                shadowOpacity: 1,
                shadowOffset: { height: 2, width: 2 },
                shadowRadius: 2,
            },

            android: {
                elevation: 0,
                marginHorizontal: 0,
            },
        })
    },
});
