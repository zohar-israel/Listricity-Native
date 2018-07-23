import React, { PureComponent } from 'react'
import { ListView } from 'react-native'
import styles, { loadingStyles } from './styles/main'
import GenreCell from '../components/GenreCell'

class Genres extends PureComponent {
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
                            />
                        )
                    }
                }
            />
        )
    }
}

export default Genres
