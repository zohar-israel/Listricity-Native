import React, { PureComponent } from 'react'
import {Alert, Image, Text, TouchableHighlight, View } from 'react-native'

import styles from './styles/main'

class GenreCell extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let genre = this.props.genre;
        return (
            <View style={styles.cell}>
                <TouchableHighlight
                    onPress={() => { this.props.onSelectGenre(genre) }}>
                    <View style={styles.cell}>
                        <Image
                            source={ genre.image }
                            style={styles.thumbnail}
                        />
                        <Text style={styles.cellTitle}>{genre.title}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

export default GenreCell