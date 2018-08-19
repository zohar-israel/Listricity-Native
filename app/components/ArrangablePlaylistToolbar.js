import React, { Component } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import bg from '../res/global/background';
import bgLight from '../res/global/backgroundLight';
import { getThemedStyles } from './styles/themeBuilder'

class PlaylistToolbar extends Component {
    constructor(props) {
        super(props);
        ({ Colors, styles } = getThemedStyles(props.theme, ['styles']))
        this.state = { status: 'uninited', isDialogVisible: false }
    }
    render() {
        return (
            <View>
                <View style={styles.toolbar}>
                    {this.props.theme == 'Dark' && <Image resizeMode="stretch" source={{ uri: this.props.theme == 'Dark' ? bg : bgLight }} style={styles.toolbarBackground} />}
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