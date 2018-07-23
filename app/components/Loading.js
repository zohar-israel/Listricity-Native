import React, { Component } from 'react'
import { Alert, Image, Text, TouchableHighlight, View, ActivityIndicator, Dimensions } from 'react-native'
import styles, { loadingStyles } from './styles/main'
import Colors from './styles/colors'

class Loading extends Component {
    render() {
        if (!this.props.isLoading) return null
        return (
            <View style={styles.full}>
                <View style={loadingStyles.container}>
                    {this.props.isLoadingTitle &&
                        <Text style={loadingStyles.text}>{this.props.isLoadingTitle}</Text>
                    }
                    <ActivityIndicator
                        animating={this.props.isLoading}
                        size="large"
                        color={Colors.activityIndicator}
                    />
                    {
                        this.props.isLoadingInfo && <Text style={loadingStyles.text}>{this.props.isLoadingInfo}</Text>
                    }
                </View>
            </View >
        )
    }
}

export default Loading
