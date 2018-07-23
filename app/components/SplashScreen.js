import React, { PureComponent } from 'react'
import { Image, Text, View, ActivityIndicator } from 'react-native'
import styles, { loadingStyles } from './styles/main'
import Colors from './styles/colors'

class SplashScreen extends PureComponent {
    render() {
        return (
            <View style={styles.visible}>
                <Image source={require("../res/global/init-background.jpg")} style={loadingStyles.splashBackground} />
                <View style={loadingStyles.splashIndicator}>
                    <ActivityIndicator
                        animating={this.props.isLoading}
                        size="large"
                        color={Colors.activityIndicator}
                    />
                </View>
                <View style={loadingStyles.splashFooterContainer}>
                    <Text style={[loadingStyles.text, loadingStyles.splashFooterText]}>Free software, hell yea!</Text>
                </View>
            </View >
        )
    }
}

export default SplashScreen
