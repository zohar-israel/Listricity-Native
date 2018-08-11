import React, { Component } from 'react'
import { StyleSheet, Image, Text, TouchableHighlight, TouchableOpacity, View, Dimensions, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles, { playlistStyles } from './styles/main'
import Colors from './styles/colors'
import Swipeout from './swipeout'
import AnimatedIconButton from './animatedIconButton'
import unescape from 'lodash/unescape';
import { duration } from '../bll/duration'

const window = Dimensions.get('window')

class PlaylistItem extends Component {
    constructor() {
        super();
        this.state = {
            sectionID: null,
            rowID: null,
            animation: new Animated.Value(91)
        };
        this.selectPlaylistItem = this.selectPlaylistItem.bind(this)
        this.onOpen = this.onOpen.bind(this)
        this.toggleFavoriteItem = this.toggleFavoriteItem.bind(this)
        this.moveUpPlaylistItem = this.moveUpPlaylistItem.bind(this)
        this.moveDownPlaylistItem = this.moveDownPlaylistItem.bind(this)
        this.queueNextPlaylistItem = this.queueNextPlaylistItem.bind(this)
        this.removePlaylistItem = this.removePlaylistItem.bind(this)
        this.longPressItem = this.longPressItem.bind(this)


        this.actionButtons = {
            moveUp:
                <TouchableOpacity onPress={this.moveUpPlaylistItem}>
                    <View style={[styles.listLastIcon]}>
                        <Icon name="arrow-circle-up" size={40} color={Colors.icon} />
                    </View>
                </TouchableOpacity>
            ,
            moveDown:
                <TouchableOpacity onPress={this.moveDownPlaylistItem}>
                    <View style={[styles.listLastIcon]}>
                        <Icon name="arrow-circle-down" size={40} color={Colors.icon} />
                    </View>
                </TouchableOpacity>
            ,
            queueNext:
                <TouchableOpacity onPress={this.queueNextPlaylistItem}>
                    <View style={[styles.listLastIcon]}>
                        <Icon name="play-circle" size={40} color={Colors.icon} />
                        <Text style={playlistStyles.playNext}>Next</Text>
                    </View>
                </TouchableOpacity>
            ,
            remove:
                <TouchableOpacity onPress={this.removePlaylistItem}>
                    <View style={styles.deleteIcon}>
                        <Icon name="minus-circle" size={40} color={Colors.icon} />
                    </View>
                </TouchableOpacity>

        }
    }
    toggleFavoriteItem() {
        this.props.toggleFavoriteItem(this.props.rowData)//; this.forceUpdate();
    }
    selectPlaylistItem() {
        if (this.props.selectPlaylistItem(this.props.rowData))
            this._container.setNativeProps({ style: { backgroundColor: Colors.background_selected_item } })
    }
    longPressItem() { this.props.longPressItem(this.props.rowData) }
    moveUpPlaylistItem() { this.props.moveUpPlaylistItem(this.props.rowData) }
    moveDownPlaylistItem() { this.props.moveDownPlaylistItem(this.props.rowData) }
    queueNextPlaylistItem() {
        this.setState({ sectionID: 0 })
        this.props.queueNextPlaylistItem(this.props.rowData)
    }
    removePlaylistItem() {
        let finalValue = 0
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue,
                bounciness: 0
            }
        ).start(() => this.props.removePlaylistItem(this.props.rowData));
        // this.setState({ animation: new Animated.Value(0) })

    }

    onOpen(sectionID, rowID, direction) {
        this.setState({
            sectionID,
        })
        if (direction === 'left') {
            this.removePlaylistItem()

        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.current &&
            ((nextProps.current.uuid !== this.props.rowData.uuid
                && this.props.current.uuid === this.props.rowData.uuid)
                ||
                (nextProps.current.uuid === this.props.rowData.uuid
                    && this.props.current.uuid !== this.props.rowData.uuid)
            )
        ) return true

        if (this.props.playlistShortcut !== nextProps.playlistShortcut) return true
        // if (this.props.rowData.favorite !== nextProps.rowData.favorite) return true
        if (this.props.favorite !== nextProps.favorite) return true
        // return true
        return false
    }
    render() {
        let rowData = this.props.rowData
        if (!rowData.snippet) return null
        let current = this.props.current.uuid === rowData.uuid

        let rightSwipeButtons = [];
        if (this.props.playlistShortcut != 'moveUp') rightSwipeButtons.push({ component: <View style={playlistStyles.actionButton}>{this.actionButtons.moveUp}</View> })
        if (this.props.playlistShortcut != 'moveDown') rightSwipeButtons.push({ component: <View style={playlistStyles.actionButton}>{this.actionButtons.moveDown}</View> })
        if (this.props.playlistShortcut != 'queueNext' && !current) rightSwipeButtons.push({ component: <View style={playlistStyles.actionButton}>{this.actionButtons.queueNext}</View> })
        if (this.props.playlistShortcut && this.props.playlistShortcut != 'remove' && !current) rightSwipeButtons.push({ component: <View style={playlistStyles.actionButton}>{this.actionButtons.remove}</View> })
        return (
            <Swipeout
                ref={component => this._swipeout = component}
                close={!(this.state.sectionID === rowData.id.videoId)}
                left={[{ text: 'Delete', type: 'delete', }]}
                right={rightSwipeButtons}
                rowID={rowData.id.videoId}
                sectionID={rowData.id.videoId}
                autoClose={false}
                onPress={this.selectPlaylistItem}
                onLongPress={this.longPressItem}
                onOpen={this.onOpen}
                backgroundColor={Colors.background_dark}
            >
                <Animated.View style={{ height: this.state.animation }}>
                    <View
                        ref={component => this._container = component}
                        style={[playlistStyles.itemContainer, {
                            padding: 5, backgroundColor: Colors.background, width: window.width
                        }, this.props.current.uuid == rowData.uuid ? { backgroundColor: Colors.background_selected_item } : { backgroundColor: Colors.background_item }]}>
                        <View style={styles.containerList}>
                            <Image source={{ uri: rowData.snippet.thumbnails.default.url }} style={styles.photo} />
                            {/* {rowData.contentDetails && rowData.contentDetails.duration && <Text style={{ color: '#444', position: 'absolute', bottom: 0, fontSize: 10, backgroundColor: '#000', paddingLeft: 2, paddingRight: 3, left: 0 }}>{duration(rowData.contentDetails.duration)}</Text>} */}
                            <Text style={[styles.text, styles.textItemHeight]}>
                                {`${unescape(rowData.snippet.title)}`}
                                {/* {new Date()+':'+this.props.rowData.favorite}
                                {':'+this.props.favorite} */}
                            </Text>
                            <AnimatedIconButton size={40} checkedIcon="heart" uncheckedIcon="heart-o"
                                checked={this.props.rowData.favorite}
                                color={Colors.icon}
                                highlightColor="red"
                                touchableStyle={playlistStyles.favoriteContainer}
                                containerStyle={styles.favoriteIcon}
                                onPress={this.toggleFavoriteItem}
                            />
                            {(!this.props.playlistShortcut || current) && this.actionButtons.remove}
                            {(this.props.playlistShortcut && !current) && this.actionButtons[this.props.playlistShortcut]}
                        </View>
                    </View>
                </Animated.View >
            </Swipeout >

        )
    }
}


export default PlaylistItem