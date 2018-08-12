import React, { Component } from 'react'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import styles from '../styles/main'

export default class PlaylistHelp extends Component {
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
    The short, short version{'\n'}
                            </Text>
                            <Text style={styles.longText}>
    A few tips for the pro playlist artist.
    {'\n\n\n'}
    Swipe a track right to remove it from the playlist
    {'\n\n'}
    Swipe left to reveal some more useful options: play next, move up and move down.
    {'\n\n'}
    Long click a track to show the track info and options to search for: related tracks, tracks by the same artist, or alternate performances of the track (covers).
    {'\n\n'}
    The last action performed on a track becomes a shortcut icon on the right of all the tracks.
    {'\n\n'}
    Clicking on a track causes it to play.{'\n'}
    Clicking on the currently playing track starts it over.
    {'\n\n'}
    The Buff button adds recommended tracks to the end of the playlist.{'\n'}
    Remove the tracks you don’t like, and click the heart icon on the ones you do.
    {'\n\n'}
    Clicking the heart icon adds the track to the Favorites playlist and causes it to be preferred as taste indicator when buffing up the playlist.
    {'\n\n'}
    Tracks you added from search are also preferred as taste indicators for buffing up the playlist.
    {'\n\n'}
    Tracks are also added automatically when the last tracks are played.
    {'\n\n'}
    The Arrange menu opens the playlist in a mode where you can drag tracks up and down.
    {'\n\n'}
    The Mark icon on the bottom menu scrolls the playlist to the currently playing track.
    {'\n\n'}
    The Shuffle menu shuffles only the tracks that are after the currently playing track.
    {'\n\n'}
    The progress indicator under the video can be used to seek to a point in the track.
    {'\n\n'}
    Use the next and previous buttons on the sides of the progress indicator to navigate between tracks.{'\n'}
    This is useful when you’re on screens other than the playlist.
    {'\n\n'}
    The hardware back button takes you to the main menu from anywhere.
    {'\n\n'}
    It’s a good idea to save a playlist if you like it.
    
                            </Text>
                        </Text>
                    </ScrollView>
                </View>
            </View>
        )
    }
}