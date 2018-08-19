import React, { PureComponent } from 'react'
import { Alert, ListView, Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Collapsible from 'react-native-collapsible';
import CollapsibleTree from './CollapsibleTree';
import { getThemedStyles } from './styles/themeBuilder'

class Moods extends PureComponent {
    constructor(props) {
        super(props);
        ({ Colors, styles, moodStyles } = getThemedStyles(props.theme, ['styles', 'moodStyles']))
    }


    itemPressed(key) {
        this.props.recommendMood(key)
    }
    render() {
        return (
            <View style={moodStyles.containerMoods}>
                <ScrollView>
                    <CollapsibleTree tree={this.props.moods} itemPressed={this.itemPressed.bind(this)} theme={this.props.theme}/>
                </ScrollView>
            </View>
        )
    }
}

export default Moods