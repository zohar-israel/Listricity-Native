import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, ListView, Image, ActivityIndicator, WebView, TouchableHighlight, PixelRatio } from 'react-native';
import { AjaxAutosuggest } from './AjaxAutosuggest';
import SortableListView from './SortableListView'
import PlayListsItemContainer from '../containers/PlaylistsItemContainer';
import PlaylistsEmptyContainer from '../containers/PlaylistsEmptyContainer';
import styles, { playlistsStyles } from './styles/main'
import Colors from './styles/colors';

class RowComponent extends Component {
    playlistSelected(rowData) {
        this._container.setNativeProps({ style: { backgroundColor: Colors.background_selected_item } })
        setTimeout(() => {
            try {
                this.props.selectPlaylistsItem(rowData)
                this.props.showPlaylist();
            } catch (e) { }
        }, 0)
    }
    render() {
        let rowData = this.props.rowData;

        return (
            <TouchableHighlight
                ref={component => this._container = component}
                underlayColor={Colors.background_selected_item}
                style={[playlistsStyles.itemContainer, this.props.playlistName == rowData.name ? { backgroundColor: Colors.background_selected_item } : { backgroundColor: Colors.background_item }]}
                onPress={this.playlistSelected.bind(this, rowData)}
                {...this.props.sortHandlers}
            >
                <PlayListsItemContainer rowData={rowData} />
            </TouchableHighlight>
        )
    }
}
class Playlists extends Component {
    constructor(props) {
        super(props)
        this.loadOrder(props)
    }
    orderChanged(nextOrder) {
        let newPlaylists = {}
        nextOrder.forEach(e => newPlaylists[this.order[e]] = this.props.playlistsData[e])
        this.skipNextRender = true;
        this.props.playlistsChanged(newPlaylistVideos)
    }
    shouldComponentUpdate(nextProps, nextState) {
        this.loadOrder(nextProps)
        return true;
    }

    loadOrder(nextProps) {
        let odata = nextProps.playlistsData
        this.data = {};
        this.order = Object.keys(odata).sort()

        // Place Favorites first in order
        let favoritesIndex = this.order.indexOf('Favorites')
        if (favoritesIndex > 0) {
            this.order.splice(favoritesIndex, 1)
            this.order.unshift('Favorites')
        }
        this.order.forEach(key => {
            if (Array.isArray(odata[key].videos))
                this.data[key] = { name: key, data: odata[key] }
        }
        )
    }

    render() {
        return (
            <View style={playlistsStyles.container}>
                {(!this.order || this.order.length === 0) && <PlaylistsEmptyContainer />}
                {this.order &&
                    <SortableListView
                        style={playlistsStyles.listview}
                        data={this.data}
                        order={this.order}
                        onChangeOrder={this.orderChanged.bind(this)}
                        disableSorting={true}
                        renderRow={rowData =>
                            <RowComponent
                                rowData={rowData}
                                selectPlaylistsItem={this.props.selectPlaylistsItem}
                                showPlaylist={this.props.showPlaylist}
                                playlistName={this.props.playlistName}
                            />
                        }

                    />}
            </View>
        )
    }
}

export default Playlists
