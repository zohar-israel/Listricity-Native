import React, { PureComponent } from 'react';
import { Dimensions, Image, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles/main';
import Colors from './styles/colors'
const window = Dimensions.get('window');

class ArrangablePlaylistItem extends PureComponent {

    render() {
        let rowData = this.props.rowData
        if (!rowData.snippet) return null
        return (
            <View style={[{
                padding: 5, backgroundColor: '#333', width: window.width
            }, this.props.current.uuid == rowData.uuid ? { backgroundColor: '#542100' } : { backgroundColor: '#222' }]}>
                <View style={styles.containerList}>
                    <Image source={{ uri: rowData.snippet.thumbnails.default.url }} style={styles.photo} />
                    <Text style={styles.text}>
                        {`${rowData.snippet.title}`}
                    </Text>
                    <TouchableHighlight >
                        <View style={styles.deleteIcon}>
                            <Icon name="arrows-v" size={40} color={Colors.icon} />
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}


export default ArrangablePlaylistItem
