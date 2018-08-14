import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TouchableHighlight, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles, { settingsStyles } from './styles/main'
import Colors from './styles/colors'
import PlaylistHelp from './modals/PlaylistHelp'

class PlaylistSubmenu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
    }

    setModalVisible(visible, modal) {
        if (modal) this.setState({ modal });
        this.setState({ modalVisible: visible });
    }

    render() {
        let modalStyle = this.props.useLargePlayer ? { height: Dimensions.get('window').width * 120 / 205 } : { height: 120 }
        let modal = <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => this.setModalVisible(false)}>
            <TouchableHighlight onPress={() => this.setModalVisible(false)} style={[modalStyle]}>
                <View>
                </View>
            </TouchableHighlight>
            <View style={settingsStyles.modalContainer}>
                {this.state.modal == 'help' && <PlaylistHelp />}
            </View>
            <TouchableHighlight onPress={() => this.setModalVisible(false)}>
                <View style={settingsStyles.modalCloseButton}>
                    <Text style={styles.toolbarItemText}>Close</Text>
                </View>
            </TouchableHighlight>
        </Modal>

        // if (!this.props.playlistSubmenuVisible) return this.state.modalVisible ? <View style={styles.submenu}>{modal}</View> : null
        return (
            <View style={styles.submenuContainer}>
                {this.props.playlistSubmenuVisible &&
                    <View style={styles.submenu}>
                        <TouchableOpacity onPress={() => this.setModalVisible(true, 'help')}>
                            <View style={styles.submenuItem}>
                                <Icon name="info" size={20} color={Colors.icon} style={styles.submenuIcon} />
                                <Text style={styles.submenuItemText}>{'Tour'}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.showArrangablePlaylist}>
                            <View style={styles.submenuItem}>
                                <Icon name="arrows-v" size={20} color={Colors.icon} style={styles.submenuIcon} />
                                <Text style={styles.submenuItemText}>{'Arrange'}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.shufflePlaylist}>
                            <View style={styles.submenuItem}>
                                <Icon name="random" size={20} color={Colors.icon} style={styles.submenuIcon} />
                                <Text style={styles.submenuItemText}>{'Shuffle'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>}
                {modal}
            </View>

        )
    }
}

export default PlaylistSubmenu
