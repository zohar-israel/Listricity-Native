import React, { PureComponent } from 'react'
import { Alert, ListView, Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { moodStyles } from './styles/main'
import Collapsible from 'react-native-collapsible';
import CollapsibleTree from './CollapsibleTree';

class Moods extends PureComponent {

    itemPressed(key) {
        this.props.recommendMood(key)
    }
    render() {
        return (
            <View style={moodStyles.containerMoods}>
                <ScrollView>
                    <CollapsibleTree tree={this.props.moods} itemPressed={this.itemPressed.bind(this)} />
                </ScrollView>
            </View>
        )
    }
}

export default Moods