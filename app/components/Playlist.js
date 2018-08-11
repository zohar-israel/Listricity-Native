import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, ListView, Image, ActivityIndicator, WebView, TouchableHighlight, TouchableOpacity } from 'react-native';
import PlaylistItemContainer from '../containers/PlaylistItemContainer';
import PlaylistToolbarContainer from '../containers/PlaylistToolbarContainer';
import PlaylistSubmenuContainer from '../containers/PlaylistSubmenuContainer';
import PlaylistEmptyContainer from '../containers/PlaylistEmptyContainer';
import PlaylistItemDetailsContainer from '../containers/PlaylistItemDetailsContainer';
import Loading from './Loading'
import styles, { playlistStyles, homeStyles } from './styles/main'

class Playlist extends React.Component {

    constructor(props) {
        super(props)
        this.state = { detailsVisible: false }
        this.longPressItem = this.longPressItem.bind(this)
        this.selectPlaylistItem = this.selectPlaylistItem.bind(this)
        this.scrollingTime = new Date()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            if (nextProps.currentRecommendationRequest && nextProps.currentRecommendationRequest.type == 'error') {
                if (nextProps.playlistData.videos.length === 0)
                    this.emptyMessage = nextProps.currentRecommendationRequest.message
                else {
                    delete this.emptyMessage
                    this.props.playlistChanged()
                }
            }
            if (nextProps.current && this.lastScrolledToUUID != nextProps.current.uuid) {
                this.lastScrolledToUUID = nextProps.current.uuid
                let totalHeight = 91 * nextProps.playlistData.videos.findIndex(e => e.uuid == nextProps.current.uuid) - 55
                this.scrollView.scrollTo({ x: 0, y: totalHeight, animated: true })
            }
            else if (nextProps.buffedTime && new Date() - 1000 < nextProps.buffedTime) {
                setTimeout(() => { try { this.scrollView.scrollToEnd({ animated: true }) } catch (e) { } }, 1000)
            }
        }
    }
    componentDidMount() {
        setTimeout(this.scrollToCurrent.bind(this), 100)
    }
    scrollToCurrent() {
        try {
            if (!this.props.current) return
            this.lastScrolledToUUID = this.props.current.uuid
            let totalHeight = 91 * this.props.playlistData.videos.findIndex(e => e.uuid == this.props.current.uuid) - 55
            this.scrollView.scrollTo({ x: 0, y: totalHeight, animated: true })
        } catch (e) { }
    }
    longPressItem(rowData) {
        this.setState({ detailsVisible: rowData })
    }
    selectPlaylistItem(rowData) {
        if (!this.scrolling && new Date() - this.scrollingTime > 1000) {
            setTimeout(() => { try { this.props.selectPlaylistItem(rowData) } catch (e) { } }, 0)
            return true
        }
        else return false
    }
    onScrollEndDrag() {
        setTimeout(() => { try { this.scrolling = false} catch (e) { } }, 300)
        this.scrollingTime = new Date()
    }
    onScrollBeginDrag() {
        this.scrolling = true
        this.scrollingTime = new Date()
        this.props.hidePlaylistSubmenu()
    }
    render() {
        let isloading = false
        let isLoadingInfo = ''
        // let message = ''
        if (this.props.currentRecommendationRequest && this.props.currentRecommendationRequest.type != 'error') {
            if (this.props.playlistData.videos.length == 0 && this.props.currentRecommendationRequest) isloading = true
            isLoadingInfo = isloading ? 'Generating ' + this.props.currentRecommendationRequest.type + ' playlist ... ' : ''
            // if (this.props.currentRecommendationRequest.type == 'error') message = this.props.currentRecommendationRequest.message
        }
        return (
            <View style={playlistStyles.container} onPress={this.props.hidePlaylistSubmenu}>
                <Loading isLoading={isloading} isLoadingInfo={isLoadingInfo} />
                {(this.props.playlistData.videos.length === 0 && !isloading) && <PlaylistEmptyContainer message={this.emptyMessage} />}
                <ListView
                    onScrollBeginDrag={this.onScrollBeginDrag.bind(this)}
                    onScrollEndDrag={this.onScrollEndDrag.bind(this)}
                    ref={el => this.scrollView = el}
                    enableEmptySections={true}
                    style={playlistStyles.listview}
                    dataSource={this.props.playlistDataSource}
                    initialListSize={Math.max(10, this.props.playlistData.videos.findIndex(e => e.uuid === this.props.current.uuid) + 2)}
                    renderRow={rowData => <PlaylistItemContainer rowData={rowData} key={this.props.playlistData.name + ':' + rowData.uuid} longPressItem={this.longPressItem} selectPlaylistItem={this.selectPlaylistItem} />}
                />
                {!(this.props.playlistData.videos.length === 0 && !isloading) && <PlaylistToolbarContainer scrollToCurrent={this.scrollToCurrent.bind(this)} />}
                <PlaylistSubmenuContainer />
                {this.state.detailsVisible && <PlaylistItemDetailsContainer
                    rowData={this.state.detailsVisible}
                    onClose={() => this.setState({ detailsVisible: false })}
                    showResults={this.props.showResults}
                />}

            </View>
        )
    }
}

export default Playlist
