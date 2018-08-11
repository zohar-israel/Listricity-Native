import React, { PureComponent } from 'react'
import { Alert, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import AnimatedIconButton from './animatedIconButton'
import Icon from 'react-native-vector-icons/FontAwesome'
import Colors from './styles/colors'
import styles, { playlistStyles, playlistItemDetailsStyles } from './styles/main'
import unescape from 'lodash/unescape'
import { duration } from '../bll/duration'

class PlaylistItemDetails extends PureComponent {
    toggleFavoriteItem() {
        this.props.toggleFavoriteItem(this.props.rowData);
    }
    render() {
        rowData = this.props.rowData
        let title = unescape(rowData.snippet.title.replace(/\([^)]*\)/gi, '')
            .replace(/\[[^)]*\]/gi, ''))
        let phrases = title.split(/ft\.|,|feat\.|\s-|\//gi).filter(e => e != '')
        let searches = []
        for (var i = 0; i < phrases.length; i++) {
            let phrase = phrases[i].trim().replace(/[^a-z\s']/gi, '').trim()
            if (phrase == ''
                || phrase.toLowerCase() == 'lyrics'
                || phrase.toLowerCase().indexOf('video') > -1
                || phrase.length < 3) continue
            searches.push(
                <TouchableOpacity key={'search_' + i} onPress={() => { this.props.onClose(); this.props.showResults('pre-populated', phrase, null) }}
                    style={playlistItemDetailsStyles.actionButton}>
                    <View style={playlistItemDetailsStyles.caption}>
                        <Icon name="search" size={40} color={Colors.icon} />
                        <Text style={playlistItemDetailsStyles.captionText}>{phrase}</Text>
                    </View>
                </TouchableOpacity >
            )
        }
        let description = null
        if (rowData.snippet.description) {
            description = rowData.snippet.description.split('http')[0]
            if (description !== rowData.snippet.description) description = description.substring(0, description.lastIndexOf('\n'))
            if (description && description !== rowData.snippet.title)
                description = <View style={playlistItemDetailsStyles.descriptionContainer}>
                    <Text style={playlistItemDetailsStyles.description}>
                        <Icon name="info" size={40} color={Colors.icon} />{'\u00A0\u00A0'}
                        {unescape(description)}</Text>
                </View>
            else description = null
        }
        return (
            <View style={playlistItemDetailsStyles.container}>
                <View style={[styles.containerList, playlistItemDetailsStyles.containerTitle]}>
                    <Image source={{ uri: rowData.snippet.thumbnails.default.url }} style={[styles.photo, playlistItemDetailsStyles.photo]} />
                    <Text style={[styles.text, playlistItemDetailsStyles.title]}>
                        {`${unescape(rowData.snippet.title)}`}
                    </Text>
                </View>
                <ScrollView style={playlistItemDetailsStyles.scrollView}>
                    <TouchableOpacity key={'search_' + i} onPress={() => {
                        this.props.onClose(); this.props.showResults('related', unescape(rowData.snippet.title), rowData.id.videoId)
                    }
                    } style={playlistItemDetailsStyles.actionButton}>
                        <View style={playlistItemDetailsStyles.caption}>
                            <Icon name="puzzle-piece" size={40} color={Colors.icon} />
                            <Text style={playlistItemDetailsStyles.captionText}>{'Show related tracks'}</Text>
                        </View>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => { this.props.removeAllNext(rowData); this.props.onClose() }}
                        style={playlistItemDetailsStyles.actionButton}>
                        <View style={playlistItemDetailsStyles.caption}>
                            <Icon name="minus-circle" size={40} color={Colors.icon} />
                            <Text style={playlistItemDetailsStyles.captionText}>Remove track and all following tracks</Text>
                        </View>
                    </TouchableOpacity>
                    {searches}
                    {description}
                </ScrollView>
                <TouchableOpacity onPress={this.props.onClose} style={playlistItemDetailsStyles.closeButton}>
                    <View style={styles.toolbarItem}>
                        <Text style={styles.submenuItemText}>{'Close'}</Text>
                    </View>
                </TouchableOpacity>
            </View >
        )
    }
}

export default PlaylistItemDetails
