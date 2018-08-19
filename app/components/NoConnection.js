import React, { PureComponent } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { getThemedStyles } from './styles/themeBuilder'

class Home extends PureComponent {
    constructor(props) {
        super(props);
        ({ Colors, styles, homeStyles } = getThemedStyles(props.theme, ['styles', 'homeStyles']))
    }
    
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