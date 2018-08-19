import React, { Component } from 'react'
import { Alert, Image, Text, TouchableHighlight, View, ActivityIndicator, Dimensions } from 'react-native'
import { getThemedStyles } from './styles/themeBuilder'

class Loading extends Component {
    constructor(props) {
        super(props);
        ({ Colors, styles, loadingStyles } = getThemedStyles(props.theme, ['styles', 'loadingStyles']))
    }

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
                        color={Colors.activity_indicator}
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
