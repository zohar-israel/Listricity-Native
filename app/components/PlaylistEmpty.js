import React, { PureComponent } from 'react';
import { Alert, StyleSheet, Text, View, ListView, Image, ActivityIndicator, WebView, TouchableHighlight, TouchableOpacity } from 'react-native';
import styles, { playlistStyles, homeStyles } from './styles/main'

class PlaylistEmpty extends PureComponent {

    render() {
        return (
            <View style={playlistStyles.emptyContainer} >
                <Text style={playlistStyles.prompt}>
                    {this.props.message}
                    {!this.props.message &&
                        'Playlist is empty'} , add tracks from:{'\n'}{'\n'}
                </Text>
                <TouchableOpacity onPress={this.props.showSearchResults}>
                    <Image resizeMode="contain"
                        style={styles.smallButton}
                        source={require('../res/icons/search.png')}
                    />
                    <Text style={styles.homeItemText}>{'Search'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.showGenres}>
                    <Image resizeMode="contain"
                        style={styles.smallButton}
                        source={require('../res/icons/genres.png')}
                    />
                    <Text style={styles.homeItemText}>{'Genres'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.showMoods}>
                    <Image resizeMode="contain"
                        style={styles.smallButton}
                        source={require('../res/icons/moods.png')}
                    />
                    <Text style={styles.homeItemText}>{'Moods'}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default PlaylistEmpty
