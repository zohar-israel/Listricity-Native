import React, { PureComponent } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import bg from '../res/global/background';
import styles from './styles/main';
import Colors from './styles/colors'

class PlaylistToolbar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { status: 'uninited', isDialogVisible: false }
    }
    nextClicked() {
        if (this.props.closeToEnd && this.props.autoBuffUp)
            this.props.buffPlaylist();
        this.props.playNextlistItem()
    }
    render() {
        return (

            <View style={styles.toolbar}>
                <Image resizeMode="stretch" source={{ uri: bg }} style={styles.toolbarBackground} />
                <TouchableOpacity onPress={this.props.togglePlaylistSubmenu} style={styles.menuIcon}>
                    <View style={[styles.toolbarItem, styles.toolbarMenu]}>
                        <Icon name="bars" size={40} color={Colors.barsIcon} />

                        {/* <Text style={styles.toolbarItemText}>{'More'}</Text> */}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.setState({ isDialogVisible: true }); this.props.hidePlaylistSubmenu() }}>
                    <View style={styles.toolbarItem}>
                        <Text style={styles.toolbarItemText}>{'Save'}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.clearPlaylist}>
                    <View style={styles.toolbarItem}>
                        <Text style={styles.toolbarItemText}>{'Clear'}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.nextClicked.bind(this)}>
                    <View style={styles.toolbarItem}>
                        <Text style={styles.toolbarItemText}>{'Next'}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.buffPlaylist}>
                    <View style={styles.toolbarItem}>
                        <Text style={styles.toolbarItemText}>{'Buff'}</Text>
                    </View>
                </TouchableOpacity>
                {this.state.isDialogVisible && <DialogInput isDialogVisible={this.state.isDialogVisible}
                    title={"Save playlist"}
                    message={"Enter a name for this playlist"}
                    hintInput={"Playlist name"}
                    defaultValue={this.props.playlistData.name != 'Favorites' ? this.props.playlistData.name : ''}
                    submitInput={(inputText) => { this.setState({ isDialogVisible: false }); this.props.savePlaylist(inputText) }}
                    closeDialog={() => this.setState({ isDialogVisible: false })}
                >
                </DialogInput>}
            </View >
        )
    }
}

export default PlaylistToolbar