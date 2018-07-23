import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, ListView, Image, ActivityIndicator, WebView, TouchableHighlight, PixelRatio } from 'react-native';
import { AjaxAutosuggest } from './AjaxAutosuggest';
import SortableListView from './SortableListView'
import PlayListsItemContainer from '../containers/PlaylistsItemContainer';
import PlaylistToolbarContainer from '../containers/PlaylistToolbarContainer';
import styles, { playlistsStyles } from './styles/main'

class RowComponent extends React.Component {
    playlistSelected(rowData) {
        this._container.setNativeProps({ style: { backgroundColor: '#542100' } })
        setTimeout(() => {
            this.props.selectPlaylistsItem(rowData)
            this.props.showPlaylist();
        }, 0)
    }
    render() {
        let rowData = this.props.rowData;

        return (
            <TouchableHighlight
                ref={component => this._container = component}
                underlayColor={'#542100'}
                style={playlistsStyles.itemContainer}
                onPress={this.playlistSelected.bind(this, rowData)}
                {...this.props.sortHandlers}
            >
                <PlayListsItemContainer rowData={rowData} />
            </TouchableHighlight>
        )
    }
}
class Playlists extends React.Component {
    orderChanged(nextOrder) {
        let newPlaylists = {}
        nextOrder.forEach(e => newPlaylists[this.order[e]] = this.props.playlistsData[e])
        this.skipNextRender = true;
        this.props.playlistsChanged(newPlaylistVideos)

    }
    order
    render() {
        let odata = this.props.playlistsData
        var data = {};
        order = Object.keys(odata);
        order.forEach(key => {
            if (Array.isArray(odata[key].videos))
                data[key] = { name: key, data: odata[key] }
        }
        );

        return (
            <View style={playlistsStyles.container}>
                <SortableListView
                    style={playlistsStyles.listview}
                    data={data}
                    order={order}
                    onChangeOrder={this.orderChanged.bind(this)}
                    disableSorting={true}
                    renderRow={rowData =>
                        <RowComponent
                            rowData={rowData}
                            selectPlaylistsItem={this.props.selectPlaylistsItem}
                            showPlaylist={this.props.showPlaylist}
                        />
                    }

                />
            </View>
        )
    }
}

export default Playlists
