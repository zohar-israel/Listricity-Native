import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Image, ActivityIndicator, WebView, TouchableHighlight } from 'react-native';
import { AjaxAutosuggest } from './AjaxAutosuggest';
import SearchResultContainer from '../containers/SearchResultContainer';
import SearchResultsEmpty from './SearchResultsEmpty'
import Loading from './Loading';
import searchResultsStyles from './styles/main'


export default class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gotSuggestions: false,
        }

    }

    renderCell = (rowData) => (
        <SearchResultContainer rowData={rowData} />
    );

    parseResults(responseText) {
        let parsed=JSON.parse(responseText)[1].map((r) => r[0])
        this.setState({ gotSuggestions: parsed.length>0 }); 
        return parsed
    }

    render() {
        return (
            <View style={searchResultsStyles.container}>
                <AjaxAutosuggest
                    style={searchResultsStyles.autoSuggest}

                    buildApiURL={(text) => 'http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1a&format=5&alt=json&q=' + encodeURIComponent(text)}
                    parseResults={this.parseResults.bind(this)}
                    placeholder='Search'
                    minLength={0} // minimum length of text to search
                    autoFocus={!this.props.hasData && this.props.visibleView === 'searchResults'}
                    listViewDisplayed='auto'    // true/false/undefined
                    onOptionSelected={this.props.callService}
                    onSubmit={this.props.callService}
                    debounce={300} // debounce the requests in ms. Set to 0 to remove debounce. By default 200ms.
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype

                    styles={{ container: searchResultsStyles.autoSuggestContainer, listView: searchResultsStyles.autoSuggestListView }}
                />
                <Loading isLoading={this.props.isLoading} isLoadingInfo="Loading search results" />
                {(!this.props.isLoading
                    && this.props.searchDataSource.getRowCount() === 0
                    && !this.state.gotSuggestions) && <SearchResultsEmpty />}
                {!this.props.isLoading &&
                    <ListView
                        enableEmptySections={true}
                        style={searchResultsStyles.listView}
                        dataSource={this.props.searchDataSource}
                        renderRow={(rowData) => this.renderCell(rowData)}
                    />}

            </View>
        )
    }
}
