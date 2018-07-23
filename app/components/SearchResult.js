import React, { Component } from 'react'
import { StyleSheet, Image, Text, TouchableHighlight, View, Animated, PixelRatio, Alert, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles, { searchResultsStyles } from './styles/main'
import Colors from './styles/colors'

class SearchResult extends Component {
    constructor(props) {
        super(props)
        this.state = { animation: new Animated.Value(90) }
    }

    render() {
        let rowData = this.props.rowData;
        var extraStyle = {}, isInPlaylist = false
        if (this.props.playlistData.videos.findIndex(e => e.id.videoId == rowData.id.videoId) > -1) {
            extraStyle = { backgroundColor: '#0a5100' }
            isInPlaylist = true
        }
        return (
            <View>
                <TouchableHighlight onPress={() => {
                    // let finalValue = 0
                    // Animated.spring(
                    //     this.state.animation,
                    //     {
                    //         toValue: finalValue
                    //     }
                    // ).start();
                    // this.setState({ animation: new Animated.Value(0) })
                    if (isInPlaylist) {
                        //Alert.alert('Item already in playlist', 'This item is already on your playlist.')
                    }
                    else this.props.selectResult(rowData);
                }}>
                    <Animated.View style={{ height: this.state.animation }}>
                        <View style={[searchResultsStyles.containerList, extraStyle]}>
                            <Image source={{ uri: rowData.snippet.thumbnails.default.url }} style={searchResultsStyles.photo} />
                            <Text style={[searchResultsStyles.text, styles.textItemHeight]}>
                                {isInPlaylist && 'Added to playlist\n'}
                                {`${rowData.snippet.title}`}
                            </Text>
                            <TouchableOpacity onPress={() => this.props.selectResult(rowData, 'play')}>
                                <View style={[styles.listIcon]}>
                                    <Icon name="play-circle" size={40} color={Colors.icon} />
                                </View>
                            </TouchableOpacity>
                            {!isInPlaylist && <TouchableOpacity onPress={() => this.props.selectResult(rowData, 'addnext')}>
                                <View style={[styles.listIcon, { paddingLeft: 10 }]}>
                                    <Icon name="plus-circle" size={40} color={Colors.icon} />
                                    <Text style={searchResultsStyles.addNext}>Next</Text>
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