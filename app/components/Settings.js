import React, { Component } from 'react'
import { Modal, Image, ScrollView, Text, TouchableOpacity, View, TouchableHighlight, TouchableWithoutFeedback, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingsList from 'react-native-settings-list';
import Help from './modals/Help';
import About from './modals/About';
import styles,{settingsStyles} from './styles/main'
import Colors from './styles/colors';

class Settings extends Component {
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

    onFullscreenOnLandscapeValueChange(value) {
        this.props.setFullscreenOnLandscape(value)
        // if (value) this.props.setUseLargePlayer(false)
    }

    onUseLargePlayerValueChange(value) {
        this.props.setUseLargePlayer(value)
    }

    onAutoBuffUpValueChange(value){
        this.props.setAutoBuffUp(value)
    }
    render() {
        let modalStyle = this.props.useLargePlayer ? { height: Dimensions.get('window').width * 120 / 205 } : { height: 120 }
        return (
            <View style={settingsStyles.pageContainer}>
                <View style={settingsStyles.pageSubContainer}>
                    <SettingsList>
                        <SettingsList.Header headerText='Listricity Settings' headerStyle={settingsStyles.headerStyle} />
                        <SettingsList.Item
                            backgroundColor={Colors.background_item}
                            titleStyle={settingsStyles.title}
                            hasNavArrow={false}
                            switchState={this.props.fullscreenOnLandscape}
                            switchOnValueChange={this.onFullscreenOnLandscapeValueChange.bind(this)}
                            hasSwitch={true}
                            title='Switch to full screen on landscape mode'
                            titleInfo='Automatically display videos on full screen when the device is tilted to landscape angle'
                            titleInfoStyle={settingsStyles.titleInfo}
                        />
                        <SettingsList.Item
                            backgroundColor={Colors.background_item}
                            titleStyle={settingsStyles.title}
                            hasNavArrow={false}
                            switchState={this.props.useLargePlayer}
                            switchOnValueChange={this.onUseLargePlayerValueChange.bind(this)}
                            hasSwitch={true}
                            title='Use large player'
                            titleInfo='Display the video player on the full width of the screen and use the back button to return to the menu'
                            titleInfoStyle={settingsStyles.titleInfo}
                        />

                        <SettingsList.Item
                            backgroundColor={Colors.background_item}
                            titleStyle={settingsStyles.title}
                            hasNavArrow={false}
                            switchState={this.props.autoBuffUp}
                            switchOnValueChange={this.onAutoBuffUpValueChange.bind(this)}
                            hasSwitch={true}
                            title='Auto buff up'
                            titleInfo='Automatically add tracks when getting to the end of the playlist'
                            titleInfoStyle={settingsStyles.titleInfo}
                        />
                        <SettingsList.Header headerText='' headerStyle={settingsStyles.headerStyle} />

                        <SettingsList.Item
                            backgroundColor={Colors.background_item}
                            titleStyle={settingsStyles.title}
                            onPress={() => this.setModalVisible(!this.state.modalVisible, 'help')}
                            title='Help' />
                        <SettingsList.Item
                            backgroundColor={Colors.background_item}
                            titleStyle={settingsStyles.title}
                            onPress={() => this.setModalVisible(!this.state.modalVisible, 'about')}
                            title='About' />

                    </SettingsList>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}>
                    <TouchableHighlight onPress={() => this.setModalVisible(!this.state.modalVisible)} style={[modalStyle]}>
                        <View>
                        </View>
                    </TouchableHighlight>
                    <View style={settingsStyles.modalContainer}>
                        {this.state.modal == 'help' && <Help />}
                        {this.state.modal == 'about' && <About />}
                    </View>
                    <TouchableHighlight onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                        <View style={settingsStyles.modalCloseButton}>
                            <Text style={styles.toolbarItemText}>Close</Text>
                        </View>
                    </TouchableHighlight>
                </Modal>
            </View >
        );
    }

}

export default Settings