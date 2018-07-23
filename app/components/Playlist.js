import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, ListView, Image, ActivityIndicator, WebView, TouchableHighlight, TouchableOpacity } from 'react-native';
import PlaylistItemContainer from '../containers/PlaylistItemContainer';
import PlaylistToolbarContainer from '../containers/PlaylistToolbarContainer';
import PlaylistSubmenuContainer from '../containers/PlaylistSubmenuContainer';
import PlaylistEmptyContainer from '../containers/PlaylistEmptyContainer';
import Loading from './Loading'
import styles, { playlistStyles, homeStyles } from './styles/main'

class Playlist extends React.Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            if (nextProps.current && this.lastScrolledToUUID != nextProps.current.uuid) {
                this.lastScrolledToUUID = nextProps.current.uuid
                let totalHeight = 91 * this.props.playlistData.videos.findIndex(e => e.uuid == nextProps.current.uuid) - 55
                this.scrollView.scrollTo({ x: 0, y: totalHeight, animated: true })
            }
        }
    }
    render() {
        let isloading = false
        if (this.props.playlistData.videos.length == 0 && this.props.currentRecommendationRequest) isloading = true
        let isLoadingInfo = isloading ? 'Generating ' + this.props.currentRecommendationRequest.type + ' playlist ... ' : ''
        return (
            <View style={playlistStyles.container} onPress={this.props.hidePlaylistSubmenu}>
                <Loading isLoading={isloading} isLoadingInfo={isLoadingInfo} />
                {(this.props.playlistData.videos.length === 0 && !isloading) && <PlaylistEmptyContainer />}
                <ListView
                    ref={el => this.scrollView = el}
                    enableEmptySections={true}
                    style={playlistStyles.listview}
                    onScrollBeginDrag={this.props.hidePlaylistSubmenu}
                    dataSource={this.props.playlistDataSource}
                    renderRow={rowData => <PlaylistItemContainer rowData={rowData} key={rowData.uuid} />}
                />
                <PlaylistToolbarContainer />
                <PlaylistSubmenuContainer />

            </View>
        )
    }
}

export default Playlist
