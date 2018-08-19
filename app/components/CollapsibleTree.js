import React, { Component } from 'react'
import { Image, Alert, ListView, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Collapsible from 'react-native-collapsible';
import { getThemedStyles } from './styles/themeBuilder'

class CollapsibleTree extends Component {
    constructor(props) {
        super(props);
        ({ Colors, moodItemsStyles } = getThemedStyles(props.theme, ['moodItemsStyles']))
        this.state = {
            collapsedState: [],
        }
    }
    expendPressed(index, node) {
        let newState = [...this.state.collapsedState]
        if (newState[index]) newState[index] = !newState[index]
        else newState[index] = true;
        this.setState({
            collapsedState: newState
        })

    }
    render() {
        return (
            <View style={moodItemsStyles.listContainer}>
                {this.props.tree.map((node, index) =>
                    <View style={moodItemsStyles.nodeContainer} key={index}>
                        <TouchableOpacity style={moodItemsStyles.touchableContainer} onPress={_ => this.props.itemPressed(node.text)}>
                            <View style={moodItemsStyles.contentContainer}>
                                {node.image && <Image
                                    source={node.image}
                                    style={moodItemsStyles.thumbnail}
                                />}
                                <Text style={moodItemsStyles.itemText}>{node.text}</Text>
                                {node.tree &&
                                    <View style={moodItemsStyles.moreContainer}>
                                        <Icon name={this.state.collapsedState[index] ? 'chevron-up' : 'chevron-down'}
                                            size={40}
                                            style={moodItemsStyles.moreButton}
                                            onPress={this.expendPressed.bind(this, index, node)}
                                            backgroundColor="#3b5998" />
                                    </View>
                                }
                            </View>
                        </TouchableOpacity>
                        {
                            node.tree &&
                            <Collapsible collapsed={!this.state.collapsedState[index]} style={moodItemsStyles.subTree}>
                                <CollapsibleTree {...this.props} tree={node.tree} />
                            </Collapsible>
                        }
                    </View>

                )
                }
            </View>
        )
    }
}

export default CollapsibleTree