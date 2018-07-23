import React, { Component } from 'react'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import styles from '../styles/main'

export default class Help extends Component {
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
                                Listricity Help{'\n\n'}
                            </Text>
                            <Text style={styles.longText}>
                                Listricity tries to be as straight forward and self explanatory as possible. Still, just to make sure you’re not missing out on one of Listricity’s great features, here is the full features list.
{'\n'}
                                {'\n'}
                                <Image resizeMode="contain"
                                    style={styles.smallButton}
                                    source={require('../../res/icons/menu.png')}
                                />{'\u00A0\u00A0'}
                                Home screen
{'\n'}
                                {'\n'}
                                All the functionality and screens offered by Listricity are available from the home screen.{'\n'}
                                You can always return to the home screen by clicking the hardware back button, or by clicking the home screen button at the top left.
{'\n'}
                                {'\n'}
                                <Image resizeMode="contain"
                                    style={styles.smallButton}
                                    source={require('../../res/icons/search.png')}
                                />{'\u00A0\u00A0'}
                                Search screen
{'\n'}
                                {'\n'}
                                The search screen is where you’ll find tracks to add to your current playlist.{'\n'}{'\n'}
                                Start typing, click the search button or select one of the auto suggested texts to view a list of tracks.{'\n'}
                                Search for artist name, band, track, album, everything goes{'\n'}
                                {'\n'}
                                Click on a suggested track to add it to the currently active playlist{'\n'}
                                You can notice the increase in the number of tracks in the playlist on the counter shown on the top left of the screen.{'\n'}
                                {'\n'}
                                Once you added a few tracks, had on to the Playlist screen, by clicking the playlist button on the top left.{'\n'}
                                {'\n'}
                                <Image resizeMode="contain"
                                    style={styles.smallButton}
                                    source={require('../../res/icons/playlist.png')}
                                />{'\u00A0\u00A0'}
                                Playlist screen
{'\n'}
                                {'\n'}
                                The playlist screen shows the currently playing list of tracks.{'\n'}
                                The track that is played is highlighted and scrolled into view when it starts.{'\n'}
                                Clicking a track starts playing it and continues to play from that track on.{'\n'}
                                To remove a track from the playlist swipe it to the right or click the remove icon.{'\n'}
                                {'\n'}
                                Swiping to the left reveals other track options:{'\n'}
                                {'\n'}
                                Move the track up in the list{'\n'}
                                Move it down in the list{'\n'}
                                Play a track next, moves it to after the currently playing track{'\n'}
                                {'\n'}
                                Once you click an option from the buttons revealed on swiping left, that option is promoted to be shown on each of track for you convenience.{'\n'}
                                {'\n'}
                                Each track has a heart icon, clicking that heart marks the track as a favorite, adds it to the Favorites playlist, and instructs listricity to use that track when automatically buffing up the playlist.{'\n'}
                                Clicking the heart again unfavorites it and removes it from the favorites list{'\n'}
                                {'\n'}
                                On the bottom of the playlist screen there is a toolbar with some useful options:{'\n'}
                                {'\n'}
                                Save{'\n'}
                                Opens a dialog allowing you to name the playlist and save it, when you want to listen to that playlist again you’ll find it in the My Playlists screen.{'\n'}
                                {'\n'}
                                Clear{'\n'}
                                Empties the playlist{'\n'}
                                {'\n'}
                                Next{'\n'}
                                Moves on to play the next track in the playlist{'\n'}
                                {'\n'}
                                Buff{'\n'}
                                Adds more track to the playlist based on the tracks that’s already in it taking into account which tracks were favorited.
{'\n'}
                                {'\n'}
                                More options{'\n'}
                                Clicking the menu icons open a submenu with some more useful options:{'\n'}
                                {'\n'}
                                Shuffle{'\n'}
                                Randomizes the part of the playlist from the currently playing track on.
{'\n'}
                                {'\n'}
                                Arrange{'\n'}
                                Opens the playlist in a view that allows you to drag tracks up and down the list{'\n'}
                                {'\n'}
                                <Image resizeMode="contain"
                                    style={styles.smallButton}
                                    source={require('../../res/icons/playlists.png')}
                                />{'\u00A0\u00A0'}
                                My Playlists screen
{'\n'}
                                {'\n'}
                                This is where you’ll find the playlists you saved, and another, auto generated, Favorites playlist which contains all the tracks you favorited.{'\n'}
                                {'\n'}
                                Clicking a playlist opens it in the playlist screen.{'\n'}
                                You can also delete playlists you no longer like.{'\n'}
                                {'\n'}
                                <Image resizeMode="contain"
                                    style={styles.smallButton}
                                    source={require('../../res/icons/genres.png')}
                                />{'\u00A0\u00A0'}
                                Genres screen{'\n'}
                                {'\n'}
                                As an alternative to searching for tracks, Listricity can create a playlist for a selected genre, simply click a musical genre and a unique, original playlist that is different every time will be generated and played on the Playlist screen.{'\n'}
                                {'\n'}
                                <Image resizeMode="contain"
                                    style={styles.smallButton}
                                    source={require('../../res/icons/moods.png')}
                                />{'\u00A0\u00A0'}
                                Moods screen{'\n'}
                                {'\n'}
                                Another alternative to searching for tracks, is to auto generate playlists to best suit the mood your in. Moods are nested so be sure to checkout the moods under each of the major moods and the ones under those.{'\n'}
                                Click a mood and an original playlist that is different every time will be generated to best suit your mood and be played on the Playlist screen.{'\n'}
                                {'\n'}
                                <Image resizeMode="contain"
                                    style={styles.smallButton}
                                    source={require('../../res/icons/settings.png')}
                                />{'\u00A0\u00A0'}
                                Settings screen{'\n'}
                                {'\n'}
                                This is where you can read about Listricity and configure some specifics about how Listricity behaves.{'\n'}
                                {'\n'}
                                Switch to full screen on landscape mode{'\n'}{'\n'}
                                When this option is checked, tilting your device sideways to landscape view will automatically switch the display of the currently played track to full screen, tilting the device back to portrait angle will minimize the track display back.{'\n'}
                                {'\n'}
                                Use large player{'\n'}{'\n'}
                                Check this option if you prefer a larger player display which takes up the entire width of the screen.{'\n'}











                            </Text>
                        </Text>
                    </ScrollView>
                </View>
            </View>
        )
    }
}