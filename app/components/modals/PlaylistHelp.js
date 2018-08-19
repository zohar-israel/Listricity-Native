import React, { Component } from 'react'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { getThemedStyles } from '../styles/themeBuilder'

export default class PlaylistHelp extends Component {
    constructor(props) {
        super(props);
        ({ Colors, styles } = getThemedStyles(props.theme, ['styles']))
    }

    render() {
        return (
            <View>
                {this.props.theme == 'Dark' && <Image resizeMode="stretch"
                    source={require('../../res/global/modal-background.jpg')}
                    resizeMode="cover"
                    style={styles.modalBackground} />
                }
                <View style={styles.modalContainer}>
                    <ScrollView>
                        <Text style={styles.modalText}>
                            <Text style={styles.headerText}>
                                The short, short version{'\n'}
                            </Text>
                            <Text style={styles.longText}>
                                A few tips for the pro playlist artist.
    {'\n\n\n'}
                                <Image resizeMode="contain"
                                    style={styles.smallButton}
                                    source={require('../../res/global/swipe-right.png')}
                                />{'\u00A0\u00A0'}
                                Swipe a track right to remove it from the playlist.
    {'\n\n'}
                                <Image resizeMode="contain"
                                    style={styles.smallButton}
                                    source={require('../../res/global/swipe-left.png')}
                                />{'\u00A0\u00A0'}
                                Swipe left to reveal some more useful options: play next, move up and move down.{'\u00A0\u00A0'}
                                <Icon name="arrow-circle-up" size={20} color={Colors.icon} />{'\u00A0'}
                                <Icon name="arrow-circle-down" size={20} color={Colors.icon} />{'\u00A0'}
                                <Icon name="play-circle" size={20} color={Colors.icon} />

                                {'\n\n'}
                                <Image resizeMode="contain"
                                    style={styles.smallButton}
                                    source={require('../../res/global/tap.png')}
                                />{'\u00A0\u00A0'}
                                Long click a track to show the track info and options to search for:{'\n\n'}
                                {'\u00A0\u00A0'}
                                <Icon name="puzzle-piece" size={20} color={Colors.icon} />
                                {'\u00A0\u00A0'}related tracks{'\n'}
                                {'\u00A0\u00A0'}
                                <Icon name="search" size={20} color={Colors.icon} />
                                {'\u00A0\u00A0'}tracks by the same artist{'\n'}
                                {'\u00A0\u00A0'}
                                <Icon name="search" size={20} color={Colors.icon} />
                                {'\u00A0\u00A0'}alternate performances of the track (covers)
    {'\n\n'}
                                <Icon name="arrow-circle-up" size={20} color={Colors.icon} />{'\u00A0'}
                                <Icon name="arrow-circle-down" size={20} color={Colors.icon} />{'\u00A0'}
                                <Icon name="play-circle" size={20} color={Colors.icon} />{'\u00A0\u00A0'}
                                The last action performed on a track becomes a shortcut icon on the right of all the tracks.
    {'\n\n'}
                                <Image resizeMode="contain"
                                    style={styles.smallButton}
                                    source={require('../../res/global/tap.png')}
                                />{'\u00A0\u00A0'}
                                Clicking on a track causes it to play.{'\n'}
                                Clicking on the currently playing track starts it over.
    {'\n\n'}
                                The Buff button adds recommended tracks to the end of the playlist.{'\n'}
                                Remove the tracks you don’t like, and click the heart icon on the ones you do.
    {'\n\n'}
                                <Icon name="heart" size={30} color={'darkred'} />{'\u00A0\u00A0'}
                                Clicking the heart icon adds the track to the Favorites playlist and causes it to be preferred as taste indicator when buffing up the playlist.
    {'\n\n'}
                                <Icon name="heart-o" size={30} color={'darkred'} />{'\u00A0\u00A0'}
                                Clicking the heart icon again 'Un-Favorites' it.
    {'\n\n'}
                                Tracks you added from search are also preferred as taste indicators for buffing up the playlist.
    {'\n\n'}
                                Tracks are also added automatically when the last tracks are played.
    {'\n\n'}
                                <Icon name="arrows-v" size={30} color={Colors.icon} />{'\u00A0\u00A0'}
                                The Arrange menu opens the playlist in a mode where you can drag tracks up and down.
    {'\n\n'}
                                <Icon name="crosshairs" size={30} color={Colors.bars_icon} />{'\u00A0\u00A0'}
                                The crosshairs icon on the bottom menu scrolls the playlist to the currently playing track.
    {'\n\n'}
                                The Shuffle menu shuffles only the tracks that are after the currently playing track.
    {'\n\n'}
                                The progress indicator under the video can be used to seek to a point in the track.
    {'\n\n'}
                                <Icon name='backward' size={16} color={Colors.icon} />{'\u00A0\u00A0'}
                                <Icon name='forward' size={16} color={Colors.icon} />
                                {'\u00A0\u00A0'}
                                Use the next and previous buttons on the sides of the progress indicator to navigate between tracks.{'\n'}
                                This is useful when you’re on screens other than the playlist.
    {'\n\n'}
                                The hardware back button takes you to the main menu from anywhere.
    {'\n\n'}
                                It’s a good idea to save a playlist if you like it.
    {'\n\n'}
                                You're all set, rock on! {'\u00A0\u00A0'}
                                <Image resizeMode="contain"
                                    style={[styles.smallButton, { transform: [{ rotate: '10deg' }] }]}
                                    source={require('../../res/global/rock.png')}
                                />
                            </Text>
                        </Text>
                    </ScrollView>
                </View>
            </View>
        )
    }
}