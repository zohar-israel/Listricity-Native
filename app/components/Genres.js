import React, { PureComponent } from 'react'
import { ListView } from 'react-native'
import GenreCell from '../components/GenreCell'
import { getThemedStyles } from './styles/themeBuilder'

class Genres extends PureComponent {
    constructor(props) {
        super(props);
        ({ Colors, styles } = getThemedStyles(props.theme, ['styles']))
    }

    render() {
        return (
            <ListView
                enableEmptySections={true}
                contentContainerStyle={styles.grid}
                dataSource={this.props.genresDataSource}
                renderRow={
                    (genre) => {
                        return (
                            <GenreCell
                                genre={genre}
                                onSelectGenre={this.props.selectGenre}
                                theme={this.props.theme}
                            />
                        )
                    }
                }
            />
        )
    }
}

export default Genres
