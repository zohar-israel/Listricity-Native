import React, { Component } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import bg from '../res/global/background';
import styles from './styles/main';

class PlaylistToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = { status: 'uninited', isDialogVisible: false }
    }
    render() {
        return (
            <View>
                <View style={styles.toolbar}>
                    <Image resizeMode="stretch" source={{ uri: bg }} style={styles.toolbarBackground} />
                    <View style={styles.toolbarMessage}>
                        <Text style={styles.toolbarItemText}>{' Drag tracks up and down'}</Text>
                    </View>
                    <TouchableOpacity onPress={_ => { this.props.hidePlaylistSubmenu(); this.props.showPlaylist() }}>
                        <View style={styles.toolbarItem}>
                            <Text style={styles.toolbarItemText}>{'Done'}</Text>
                        </View>
                    </TouchableOpacity>
                </View >
            </View>
        )
    }
}

export default PlaylistToolbar