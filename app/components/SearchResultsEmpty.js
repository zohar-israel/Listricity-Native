import React, { PureComponent } from 'react';
import { Alert, StyleSheet, Text, View, ListView, Image, ActivityIndicator, WebView, TouchableHighlight, TouchableOpacity } from 'react-native';
import { getThemedStyles } from './styles/themeBuilder'

class SearchResultsEmpty extends PureComponent {
    constructor(props) {
        super(props);
        ({ Colors, styles, playlistStyles, homeStyles } = getThemedStyles(props.theme, ['styles', 'playlistStyles', 'homeStyles']))
    }

    render() {
        return (
            <View style={playlistStyles.emptyContainer} >
                <Text style={playlistStyles.prompt}>
                    Search for an artist name, a band, an album{'\n'}{'\n'}...anything realy
                </Text>
            </View>
        )
    }
}

export default SearchResultsEmpty
