import React, { Component } from 'react'
import { Dimensions, Image, Linking, ScrollView, Text, View } from 'react-native'
import styles from '../styles/main'

export default class About extends Component {
    render() {
        return (
            <View>
                <Image resizeMode="stretch"
                    source={require('../../res/global/modal-background.jpg')}
                    resizeMode="cover"
                    style={styles.modalBackground} />

                <View style={styles.modalContainer}>
                    <ScrollView>
                        <Text style={styles.modalText}>
                            <Text style={styles.headerText}>
                                About Listricity{'\n\n'}
                            </Text>
                            <Text style={styles.longText}>
                                Listricity is a free, unlimited, ad-free, open-source playlist composer and music player.{'\n'}{'\n'}

                                For any feature requests, bug reports, or collaboration offers please visit{'\u00A0'}
                                <Text style={styles.link}
                                    onPress={() => Linking.openURL('http://google.com')}>
                                    Listricity repository at GitHub
                                </Text>{'\n'}{'\n'}

                                The power of Listricity is in her recommendations engine, she gets to know you as you search for tracks, add them to your playlists and favorite them.{'\n'}{'\n'}

                                The powerful recommendation engine will add tracks to your playlist according to the tracks you added to it.{'\n'}
                                {'\n'}
                                You can create a great playlist by searching and selecting a single track, but better yet, select a few and favorite the automatically added recommendations you like, give Listricity something to work with, and you'll get a really awesome one.{'\n'}
                                {'\n'}
                                <Image resizeMode="contain"
                                    style={styles.smallButton}
                                    source={require('../../res/icons/search.png')}
                                />{'\u00A0\u00A0'}Start playlists by searching for a specific track, album, performer or group{'\n'}{'\n'}
                                <Image resizeMode="contain"
                                    style={styles.smallButton}
                                    source={require('../../res/icons/genres.png')}
                                />{'\u00A0\u00A0'}By selecting a musical genre.{'\n'}{'\n'}
                                <Image resizeMode="contain"
                                    style={styles.smallButton}
                                    source={require('../../res/icons/moods.png')}
                                />{'\u00A0\u00A0'}Or by selecting your mood{'\n'}
                                {'\n'}{'\n'}

                                If you like the resulted playlist, don't forget to save it. {'\n'}
                                You'll find it in the{'\u00A0\u00A0'}
                                <Image resizeMode="contain"
                                    style={styles.smallButton}
                                    source={require('../../res/icons/playlists.png')}
                                />{'\u00A0\u00A0'}My Playlists section when you want to listen to it again.
                                {'\n'}{'\n'}{'\n'}


                            </Text>
                        </Text>
                    </ScrollView>
                </View>
            </View>
        )
    }
}