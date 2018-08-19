import React, { Component } from 'react'
import { Alert, StyleSheet, Image, Text, TouchableHighlight, View, Share } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { getThemedStyles } from './styles/themeBuilder'
import RNShareFile from 'react-native-share-file'

var RNFS = require('react-native-fs');

class PlaylistsItem extends Component {
    constructor(props) {
        super(props);
        ({ Colors, styles, playlistsStyles } = getThemedStyles(props.theme, ['styles', 'playlistsStyles']))
    }
    
    sharePlaylistsItem(name) {
        Alert.alert(
            'Share confirmation',
            'Are you sure you want to share playlist ' + name + '?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Share', onPress: () => {
                        let url = 'content://com.listricity.fileprovider/playlists/' + name + '.listricity'
                        let resp = RNShareFile.share({
                            url,
                            type: 'application/vnd.listricity',
                            package: 'com.whatsapp'
                        }, (resp) => {
                            console.warn(resp)
                            if (resp !== 'OK') {
                                Alert.alert(
                                    'Share failed',
                                    resp)
                            }
                        })
                    }
                },
            ],
            { cancelable: false }
        )

    }
    removePlaylistsItem(name) {
        Alert.alert(
            'Delete confirmation',
            'Are you sure you want to delete playlist ' + name + '?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => this.props.removePlaylistsItem(name) },
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
                    <TouchableHighlight onPress={() => this.sharePlaylistsItem(rowData.name)} style={playlistsStyles.listItemButton}>
                        <View style={[styles.listIcon]}>
                            <Icon name="share-alt" size={30} color={Colors.icon} />
                        </View>
                    </TouchableHighlight>
                    {!isFavorites && <TouchableHighlight onPress={() => this.removePlaylistsItem(rowData.name)} style={playlistsStyles.listItemButton}>
                        <View style={[styles.listIcon]}>
                            <Icon name="minus-circle" size={30} color={Colors.icon} />
                        </View>
                    </TouchableHighlight>}
                    <TouchableHighlight onPress={() => this.props.viewPlaylistsItem(rowData.name)} style={playlistsStyles.listItemButton}>
                        <View style={[styles.listIcon]}>
                            <Icon name="eye" size={30} color={Colors.icon} />
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

export default PlaylistsItem