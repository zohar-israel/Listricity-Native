import React, { PureComponent } from 'react'
import { Alert, ListView, Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { moodStyles } from './styles/main'
import Collapsible from 'react-native-collapsible';
import CollapsibleTree from './CollapsibleTree';

class Moods extends PureComponent {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         isHappyCollapsed: true,
    //         isSadCollapsed: true,
    //     }
    //     this.contentOffsetY = 0;

    // }
    itemPressed(key) {
        this.props.recommendMood(key)
    }
    // handleScroll(event: Object) {
    //     this.contentOffsetY = event.nativeEvent.contentOffset.y;
    // }
    render() {
        // console.warn(this.props.moods)
        return (
            <View style={moodStyles.containerMoods}>
                <ScrollView
                    // onScroll={this.handleScroll.bind(this)}
                    // ref='_scrollView'
                >
                    <CollapsibleTree tree={this.props.moods} itemPressed={this.itemPressed.bind(this)} />
                </ScrollView>
            </View>

        )
    }
}

export default Moods