import React, { PureComponent } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles, { homeStyles } from './styles/main'

class Home extends PureComponent {
    render() {

        return (
            <View style={homeStyles.container}>
                <Text style={styles.homeItemText}>
                    Listricity requires an Internet connection{'\n'}{'\n'}
                    Please make sure you are connected.
                </Text>
            </View>
        )
    }
}

export default Home