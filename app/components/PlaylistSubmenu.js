import React, { PureComponent } from 'react';
import { Alert, StyleSheet, Text, View, ListView, Image, ActivityIndicator, WebView, TouchableOpacity } from 'react-native';
import styles from './styles/main'


class PlaylistSubmenu extends PureComponent {
    render() {
        if (!this.props.playlistSubmenuVisible) return null
        return (
            <View style={styles.submenu}>
                <TouchableOpacity onPress={this.props.showArrangablePlaylist}>
                    <View style={styles.toolbarItem}>
                        <Text style={styles.submenuItemText}>{'Arrange'}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.shufflePlaylist}>
                    <View style={styles.toolbarItem}>
                        <Text style={styles.submenuItemText}>{'Shuffle'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default PlaylistSubmenu
