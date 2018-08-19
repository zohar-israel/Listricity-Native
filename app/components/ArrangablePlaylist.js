import React, { Component } from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    Platform,
    TouchableHighlight,
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import ArrangablePlayListItemContainer from '../containers/ArrangablePlaylistItemContainer';
import ArrangablePlaylistToolbarContainer from '../containers/ArrangablePlaylistToolbarContainer';
import { getThemedStyles } from './styles/themeBuilder'

const window = Dimensions.get('window');

export default class ArrangablePlaylist extends Component {
    constructor(props) {
        super(props);
        ({ Colors, styles, playlistStyles, arrangablePlaylistStyles } = getThemedStyles(props.theme, ['styles', 'playlistStyles', 'arrangablePlaylistStyles']))
    }

    orderChanged(nextOrder) {
        let newPlaylistVideos = []
        nextOrder.forEach(e => newPlaylistVideos.push(this.unorderedData[e]))
        this.skipNextRender = true;
        this.props.playlistChanged(newPlaylistVideos)
    }
    skipNextRender = false;
    shouldComponentUpdate(nextProps, nextState) {
        if (this.skipNextRender) {
            this.skipNextRender = false;
            return false
        }
        return true;
    }
    unorderedData = []
    render() {
        this.unorderedData = [...this.props.playlistData.videos]
        return (
            <View style={styles.full}>
                <View style={arrangablePlaylistStyles.container}>
                    <SortableList
                        style={arrangablePlaylistStyles.list}
                        contentContainerStyle={arrangablePlaylistStyles.contentContainer}
                        data={this.props.playlistData.videos}
                        renderRow={this._renderRow}
                        onPressRow={rowIndex => {
                            this.skipNextRender = true;
                            this.props.selectPlaylistItem(this.unorderedData[rowIndex])
                        }}
                        onChangeOrder={this.orderChanged.bind(this)}
                    />
                </View>
                <ArrangablePlaylistToolbarContainer />
            </View>

        );
    }

    _renderRow = ({ data, active }) => {
        return <Row data={data} active={active} selectPlaylistItem={this.props.selectPlaylistItem} />
    }
}

class Row extends Component {

    constructor(props) {
        super(props);
        ({ Colors, styles } = getThemedStyles(props.theme, ['styles']))

        this._active = new Animated.Value(0);

        this._style = {
            ...Platform.select({
                ios: {
                    transform: [{
                        scale: this._active.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.1],
                        }),
                    }],
                    shadowRadius: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 10],
                    }),
                },

                android: {
                    transform: [{
                        scale: this._active.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0.87],
                        }),
                    }],
                    elevation: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 16],
                    }),
                },
            })
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.active !== nextProps.active) {
            Animated.timing(this._active, {
                duration: 300,
                easing: Easing.bounce,
                toValue: Number(nextProps.active),
            }).start();
        }
    }

    render() {
        const { data, active } = this.props;

        return (
            <Animated.View style={[
                arrangablePlaylistStyles.row,
                this._style,
                playlistStyles.itemContainer,
                { width: window.width }
            ]}>
                <ArrangablePlayListItemContainer rowData={data} selectPlaylistItem={this.props.selectPlaylistItem} />
            </Animated.View>
        );
    }
}











