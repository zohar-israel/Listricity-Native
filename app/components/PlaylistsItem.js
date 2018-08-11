import React, { Component } from 'react'
import { Alert, StyleSheet, Image, Text, TouchableHighlight, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles, { playlistsStyles } from './styles/main'
import Colors from './styles/colors'

class PlaylistsItem extends Component {
    removePlaylistsItem(name) {
        Alert.alert(
            'Delete confirmation',
            'Are you sure you want to delete playlist ' + name + '?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => this.props.removePlaylistsItem(name)},
            ],
            { cancelable: false }
        )
    }
    render() {
        let rowData = this.props.rowData;
        if (!rowData || !rowData.data) {
            return null;
        }
        let isFavorites = rowData.name == 'Favorites'
        return (
            <View>
                <View style={[styles.containerList]}>
                    {isFavorites &&
                        <Icon name="heart" size={110} color={'darkred'} style={playlistsStyles.playlistsFavoritsIcon} />
                    }
                    {(rowData.data.videos.length > 0) && <Image source={{ uri: rowData.data.videos[0].snippet.thumbnails.default.url }} style={[playlistsStyles.playlistsPhoto, playlistsStyles.playlistsPhoto1]} />}
                    {(rowData.data.videos.length > 1) && <Image source={{ uri: rowData.data.videos[1].snippet.thumbnails.default.url }} style={[playlistsStyles.playlistsPhoto, playlistsStyles.playlistsPhoto2]} />}
                    {(rowData.data.videos.length > 2) && <Image source={{ uri: rowData.data.videos[2].snippet.thumbnails.default.url }} style={[playlistsStyles.playlistsPhoto, playlistsStyles.playlistsPhoto3]} />}

                    <View style={[playlistsStyles.listItem, styles.textItemHeight]}>
                        <Text style={[styles.text, playlistsStyles.listItemName]}>
                            {rowData.name}
                        </Text>
                        <Text style={[styles.text, playlistsStyles.listItemCount]}>
                            {rowData.data.videos.length} Tracks
                        </Text>
                    </View>
                    {!isFavorites && <TouchableHighlight onPress={() => this.removePlaylistsItem(rowData.name)} style={playlistsStyles.listItemButton}>
                        <View style={[styles.listIcon]}>
                            <Icon name="minus-circle" size={40} color={Colors.icon} />
                        </View>
                    </TouchableHighlight>}
                    <TouchableHighlight onPress={() => this.props.viewPlaylistsItem(rowData.name)} style={playlistsStyles.listItemButton}>
                        <View style={[styles.listIcon]}>
                            <Icon name="eye" size={40} color={Colors.icon} />
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

export default PlaylistsItem