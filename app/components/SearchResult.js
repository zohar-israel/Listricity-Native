import React, { Component } from 'react'
import { StyleSheet, Image, Text, TouchableHighlight, View, Animated, PixelRatio, Alert, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import unescape from 'lodash/unescape';
import styles, { searchResultsStyles } from './styles/main'
import Colors from './styles/colors'

class SearchResult extends Component {
    constructor(props) {
        super(props)
        this.state = { animation: new Animated.Value(90) }
    }
    selectResult(rowData, act) {
        this._container.setNativeProps({ style: { backgroundColor: Colors.background_existing_item } })
        this._playIcon.setNativeProps({ style: { opacity: 0 } })
        this._addNextIcon.setNativeProps({ style: { opacity: 0 } })
        setTimeout(this.props.selectResult.bind(null, rowData, act), 1)
    }
    removePlaylistItem(rowData) {
        this._container.setNativeProps({ style: { backgroundColor: '#9b3d38' } })
        let finalValue = 0
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue,
                bounciness: 0
            }
        ).start(() => this.props.removePlaylistItem(rowData));

        // setTimeout(this.props.removePlaylistItem.bind(null, rowData), 1)
    }
    render() {
        let rowData = this.props.rowData;
        var extraStyle = {}, isInPlaylist = false
        if (this.props.playlistData.videos && this.props.playlistData.videos.findIndex(e => e.id.videoId == rowData.id.videoId) > -1) {
            extraStyle = { backgroundColor: Colors.background_existing_item }
            isInPlaylist = true
        }
        return (
            <View>
                <TouchableHighlight onPress={() => {
                    if (isInPlaylist) {
                        //Alert.alert('Item already in playlist', 'This item is already on your playlist.')
                    }
                    else this.selectResult(rowData)
                }}>
                    <Animated.View style={{ height: this.state.animation }}>
                        <View style={[searchResultsStyles.containerList, extraStyle]}
                            ref={component => this._container = component}
                        >
                            <Image source={{ uri: rowData.snippet.thumbnails.default.url }} style={styles.photo} />
                            <Text style={[styles.text, styles.textItemHeight]}>
                                {isInPlaylist && '[In playlist] '}
                                {`${unescape(rowData.snippet.title)}`}
                            </Text>
                            <TouchableOpacity onPress={() => this.selectResult(rowData, 'play')} ref={component => this._playIcon = component}>
                                <View style={[styles.listIcon]}>
                                    <Icon name="play-circle" size={40} color={Colors.icon} />
                                </View>
                            </TouchableOpacity>
                            {!isInPlaylist && <TouchableOpacity onPress={() => this.selectResult(rowData, 'addnext')}  ref={component => this._addNextIcon = component}>
                                <View style={[styles.listLastIcon]}>
                                    <Icon name="plus-circle" size={40} color={Colors.icon} />
                                    <Text style={searchResultsStyles.addNext}>Next</Text>
                                </View>
                            </TouchableOpacity>}
                            {isInPlaylist && <TouchableOpacity onPress={() => this.removePlaylistItem(rowData)}>
                                <View style={[styles.listLastIcon]}>
                                    <Icon name="minus-circle" size={40} color={Colors.icon} />
                                </View>
                            </TouchableOpacity>}
                        </View>
                    </Animated.View>
                </TouchableHighlight>
            </View>
        )
    }
}


export default SearchResult