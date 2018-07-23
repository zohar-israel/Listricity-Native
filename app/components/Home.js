import React, { PureComponent } from 'react'
import { ListView, Text, TouchableOpacity, View, StyleSheet, Dimensions, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles, { homeStyles } from './styles/main'

class Home extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        this.window = Dimensions.get('window')

        return (
            <View style={homeStyles.container}>
                <View style={homeStyles.row1}>
                    <TouchableOpacity onPress={this.props.showPlaylist}>
                        <View style={[homeStyles.boxStyle, homeStyles.boxHeight]} >
                            <View style={styles.homeItem}>
                                <Image resizeMode="contain"
                                    source={require('../res/icons/playlist.png')}
                                    style={homeStyles.button}
                                />
                                <Text style={styles.homeItemText}>{'Playlist'}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.showSearchResults}>
                        <View style={[homeStyles.boxStyle, homeStyles.boxHeight]} >
                            <View style={styles.homeItem}>
                                <Image resizeMode="contain"
                                    source={require('../res/icons/search.png')}
                                    style={homeStyles.button}
                                />
                                <Text style={styles.homeItemText}>{'Search'}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={[homeStyles.row2, homeStyles.boxHeight]}>

                    <TouchableOpacity onPress={this.props.showGenres}>
                        <View style={[homeStyles.boxStyle, homeStyles.boxHeight]} >
                            <View style={styles.homeItem}>
                                <Image resizeMode="contain"
                                    source={require('../res/icons/genres.png')}
                                    style={homeStyles.button}
                                />
                                <Text style={styles.homeItemText}>{'Genres'}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.props.showPlaylists}>
                        <View style={[homeStyles.boxStyle, homeStyles.boxHeight]} >
                            <View style={styles.homeItem}>
                                <Image resizeMode="contain"
                                    source={require('../res/icons/playlists.png')}
                                    style={homeStyles.button}
                                />
                                <Text style={styles.homeItemText}>{'My Playlists'}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[homeStyles.row3, homeStyles.boxHeight]}>
                    <TouchableOpacity onPress={this.props.showSettings}>
                        <View style={[homeStyles.boxStyle, homeStyles.boxHeight]} >
                            <View style={styles.homeItem}>
                                <Image resizeMode="contain"
                                    source={require('../res/icons/settings.png')}
                                    style={homeStyles.button}
                                />
                                <Text style={styles.homeItemText}>{'Settings'}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.showMoods}>
                        <View style={[homeStyles.boxStyle, homeStyles.boxHeight]} >
                            <View style={styles.homeItem}>
                                <Image resizeMode="contain"
                                    source={require('../res/icons/moods.png')}
                                    style={homeStyles.button}
                                />
                                <Text style={styles.homeItemText}>{'Moods'}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Home