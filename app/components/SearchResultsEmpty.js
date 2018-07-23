import React, { PureComponent } from 'react';
import { Alert, StyleSheet, Text, View, ListView, Image, ActivityIndicator, WebView, TouchableHighlight, TouchableOpacity } from 'react-native';
import styles, { playlistStyles, homeStyles } from './styles/main'

class SearchResultsEmpty extends PureComponent {

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
