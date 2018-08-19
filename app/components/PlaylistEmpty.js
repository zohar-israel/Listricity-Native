import React, { PureComponent } from 'react';
import { Alert, StyleSheet, Text, View, ListView, Image, ActivityIndicator, WebView, TouchableHighlight, TouchableOpacity } from 'react-native';
import { getThemedStyles } from './styles/themeBuilder'

class PlaylistEmpty extends PureComponent {
    constructor(props) {
        super(props);
        ({ Colors, styles, playlistStyles, homeStyles } = getThemedStyles(props.theme, ['styles', 'playlistStyles', 'homeStyles']))
    }

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
