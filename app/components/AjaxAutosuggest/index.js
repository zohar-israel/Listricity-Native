import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import {
  TextInput,
  View,
  FlatList,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Platform,
  ActivityIndicator,
  PixelRatio,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

const WINDOW = Dimensions.get('window');

const defaultStyles = {
  container: {
    height: 56
  },
  textInputContainer: {
    backgroundColor: '#C9C9CE',
    height: 56,
    borderTopColor: '#7e7e7e',
    borderBottomColor: '#b5b5b5',
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
    flexDirection: 'row',
    width: '100%'
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 40,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 7.5,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 15,
    flex: 1
  },
  listView: {
    backgroundColor: '#222222',
  },
  row: {
    padding: 2,
    height: 44,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#c8c7cc',
  },
  suggestion: {
    fontWeight: 'bold',
    color: '#cccccc',
    paddingLeft: 10
  },
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
  androidLoader: {
    marginRight: -15,
  },
};

export default class AjaxAutosuggest extends Component {
  _isMounted = false;
  _results = [];
  _requests = [];
  _keyboardHeight = 10;
  selfContext;
  constructor(props) {
    super(props);
    selfContext = this;
    this.state = this.getInitialState.call(this);
  }

  getInitialState = () => ({
    text: this.props.getDefaultValue(),
    searchDataSource: this.buildRowsFromResults([]),
    listViewDisplayed: this.props.listViewDisplayed === 'auto' ? false : this.props.listViewDisplayed,
    listViewVisible: false
  })

  _keyboardDidShow(e) {
    this._keyboardHeight = e.endCoordinates.height
  }

  setText = search => this.setState({ text: search })

  getText = () => this.state.text

  buildRowsFromResults = (results) => {
    return [...results];
  }

  componentWillMount() {
    this._request = this.props.debounce
      ? debounce(this._request, this.props.debounce)
      : this._request;
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this._onChangeText(this.state.text);
    this._isMounted = true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listViewDisplayed !== 'auto') {
      this.setState({
        listViewDisplayed: nextProps.listViewDisplayed,
      });
    }

    if (typeof (nextProps.text) !== "undefined" && this.state.text !== nextProps.text) {
      this.setState({
        listViewDisplayed: true
      }, this._handleChangeText(nextProps.text));
    }
  }

  componentWillUnmount() {
    this._abortRequests();
    this._isMounted = false;
  }

  _abortRequests = () => {
    this._requests.map(i => i.abort());
    this._requests = [];
  }

  /**
   * This method is exposed to parent components to focus on textInput manually.
   * @public
   */
  triggerFocus = () => {
    if (this.refs.textInput) this.refs.textInput.focus();
  }

  /**
   * This method is exposed to parent components to blur textInput manually.
   * @public
   */
  triggerBlur = () => {
    if (this.refs.textInput) this.refs.textInput.blur();
  }

  _onPress = (rowData) => {
    //console.log('selected: '+rowData);
    this.triggerBlur()
    this.setState({
      text: rowData,
      listViewVisible: false
    });
    this.props.onOptionSelected(rowData);
  }

  _disableRowLoaders = () => {
    if (this._isMounted === true) {
      for (let i = 0; i < this._results.length; i++) {
        if (this._results[i].isLoading === true) {
          this._results[i].isLoading = false;
        }
      }

      this.setState({
        searchDataSource: this.buildRowsFromResults(this._results),
      });
    }
  }

  lastSearchKeyUp;
  searchTimer = false;
  _request = (text, skipTimer = false) => {

    this._abortRequests();
    if (text.length >= this.props.minLength) {
      const request = new XMLHttpRequest();
      this._requests.push(request);
      request.timeout = this.props.timeout;
      request.ontimeout = this.props.onTimeout;
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          if (this._isMounted === true) {
            const results = this.props.parseResults(request.responseText);
            this._results = results;
            this.setState({
              searchDataSource: this.buildRowsFromResults(results),
            });
          }
        } else {
          console.warn("AjaxAutosuggest: request could not be completed or has been aborted");
        }
      };
      request.open('GET', this.props.buildApiURL(text));
      if (this.props.query.origin !== null) {
        request.setRequestHeader('Referer', this.props.query.origin)
      }

      request.send();
    } else {
      this._results = [];
      this.setState({
        searchDataSource: this.buildRowsFromResults([]),
      });
    }
  }

  _onChangeText = (text) => {
    this._request(text);

    this.setState({
      text: text,
      listViewDisplayed: this._isMounted || this.props.autoFocus,
      listViewVisible: text.length > 0
    });
  }

  _handleChangeText = (text) => {
    this._onChangeText(text);

    const onChangeText = this.props
      && this.props.textInputProps
      && this.props.textInputProps.onChangeText;

    if (onChangeText) {
      onChangeText(text);
    }
  }

  _getRowLoader() {
    return (
      <ActivityIndicator
        animating={true}
        size="small"
      />
    );
  }

  _renderRowData = (rowData) => {
    if (this.props.renderRow) {
      return this.props.renderRow(rowData);
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={[this.props.suppressDefaultStyles ? {} : defaultStyles.suggestion, this.props.styles.suggestion]}
            numberOfLines={this.props.numberOfLines}
          >
            {this._renderSuggestion(rowData)}
          </Text>
        </View>
      </View>
    );
  }

  _renderSuggestion = (rowData) => {
    if (this.props.renderSuggestion) {
      return this.props.renderSuggestion(rowData);
    }
    return unescape(rowData.description || rowData.formatted_address || rowData.name)
  }

  _renderLoader = (rowData) => {
    if (rowData.isLoading === true) {
      return (
        <View style={[this.props.suppressDefaultStyles ? {} : defaultStyles.loader, this.props.styles.loader]}>
          {this._getRowLoader()}
        </View>
      );
    }

    return null;
  }

  _renderRow = (rowData = {}, sectionID, rowID) => {
    return (
      <ScrollView
        style={{ flex: 1 }}
        scrollEnabled={this.props.isRowScrollable}
        keyboardShouldPersistTaps={this.props.keyboardShouldPersistTaps}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <TouchableHighlight
          style={{ width: WINDOW.width }}
          onPress={() => this._onPress(rowData)}
          underlayColor={this.props.listUnderlayColor || "#c8c7cc"}
        >
          <View style={[this.props.suppressDefaultStyles ? {} : defaultStyles.row, this.props.styles.row]}>
            {this._renderRowData(rowData)}
            {this._renderLoader(rowData)}
          </View>
        </TouchableHighlight>
      </ScrollView>
    );
  }

  _renderSeparator = (sectionID, rowID) => {
    if (rowID == this.state.searchDataSource.length - 1) {
      return null
    }

    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={[this.props.suppressDefaultStyles ? {} : defaultStyles.separator, this.props.styles.separator]} />
    );
  }

  _onSubmit = () => {
    if (this.props.onSubmit)
      this.props.onSubmit(this.state.text);
  }

  _onBlur = () => {
    this.triggerBlur();

    this.setState({
      listViewDisplayed: false,
      listViewVisible: false
    });
  }

  _onFocus = () => this.setState({ listViewDisplayed: true })

  _getFlatList = () => {
    const keyGenerator = () => (
      Math.random().toString(36).substr(2, 10)
    );

    if ((this.state.text !== '') && this.state.listViewDisplayed === true) {
      return (
        <FlatList
          style={[this.props.suppressDefaultStyles ? {} : defaultStyles.listView, this.props.styles.listView]}
          data={this.state.searchDataSource}
          keyExtractor={keyGenerator}
          extraData={[this.state.searchDataSource, this.props]}
          ItemSeparatorComponent={this._renderSeparator}
          renderItem={({ item }) => this._renderRow(item)}
          {...this.props}
        />
      );
    }

    return null;
  }

  render() {
    let {
      onFocus,
      onBlur,
      ...userProps
    } = this.props.textInputProps;
    let rowheight = StyleSheet.flatten(defaultStyles.row, [{}, this.props.styles.row]).height;
    let inputheight = StyleSheet.flatten(defaultStyles.textInputContainer, [{}, this.props.styles.textInputContainer]).height;
    var h = Math.min((this._results.length) * rowheight + inputheight, WINDOW.height - this._keyboardHeight - 10)
    return (
      <TouchableWithoutFeedback
        onPress={this.triggerBlur}
        onFocus={this.triggerBlur}
        onPressIn={this.triggerBlur}
        onLongPress={this.triggerBlur}
      >
        <View
          style={[this.props.suppressDefaultStyles ? {} : defaultStyles.container, this.props.styles.container
            , this.state.listViewVisible === true ? { height: h } : {}
          ]}
          pointerEvents="box-none"
        >
          {
            !this.props.textInputHide &&
            <View
              style={[this.props.suppressDefaultStyles ? {} : defaultStyles.textInputContainer
                , this.props.styles.textInputContainer
              ]}
            >
              <TextInput
                ref="textInput"
                returnKeyType={this.props.returnKeyType}
                autoFocus={this.props.autoFocus}
                style={[this.props.suppressDefaultStyles ? {} : defaultStyles.textInput, this.props.styles.textInput]}
                value={this.state.text}
                placeholder={this.props.placeholder}
                onSubmitEditing={this.props.onSubmitEditing}
                placeholderTextColor={this.props.placeholderTextColor}
                onFocus={onFocus ? () => { this._onFocus(); onFocus() } : this._onFocus}
                onBlur={onBlur ? () => { this._onBlur(); onBlur() } : this._onBlur}
                clearButtonMode="while-editing"
                underlineColorAndroid={this.props.underlineColorAndroid}
                onSubmitEditing={this._onSubmit}
                {...userProps}
                onChangeText={this._handleChangeText}
              />
            </View>
          }
          {this._getFlatList()}
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

AjaxAutosuggest.propTypes = {
  apiURL: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  underlineColorAndroid: PropTypes.string,
  returnKeyType: PropTypes.string,
  onOptionSelected: PropTypes.func,
  onSubmit: PropTypes.func,
  buildApiURL: PropTypes.func,
  onNotFound: PropTypes.func,
  onFail: PropTypes.func,
  minLength: PropTypes.number,
  autoFocus: PropTypes.bool,
  autoFillOnNotFound: PropTypes.bool,
  getDefaultValue: PropTypes.func,
  timeout: PropTypes.number,
  onTimeout: PropTypes.func,
  query: PropTypes.object,
  styles: PropTypes.object,
  textInputProps: PropTypes.object,
  renderSuggestion: PropTypes.func,
  renderRow: PropTypes.func,
  listUnderlayColor: PropTypes.string,
  debounce: PropTypes.number,
  isRowScrollable: PropTypes.bool,
  text: PropTypes.string,
  textInputHide: PropTypes.bool,
  suppressDefaultStyles: PropTypes.bool,
  numberOfLines: PropTypes.number,
  onSubmitEditing: PropTypes.func
}

AjaxAutosuggest.defaultProps = {
  apiURL: '',
  buildApiURL: (text) => apiURL + text,
  placeholder: 'Search...',
  placeholderTextColor: '#A8A8A8',
  isRowScrollable: true,
  underlineColorAndroid: 'transparent',
  returnKeyType: 'default',
  onOptionSelected: () => { },
  onSubmit: () => { },
  onNotFound: () => { },
  onFail: () => { },
  renderSuggestion: (row) => row,
  minLength: 0,
  autoFocus: false,
  autoFillOnNotFound: false,
  keyboardShouldPersistTaps: 'always',
  getDefaultValue: () => '',
  timeout: 20000,
  onTimeout: () => console.warn('AjaxAutosuggest: request timeout'),
  query: {
  },
  styles: {},
  textInputProps: {},
  listViewDisplayed: 'auto',
  debounce: 200,
  textInputHide: false,
  suppressDefaultStyles: false,
  numberOfLines: 1,
  onSubmitEditing: () => { }
}

// this function is still present in the library to be retrocompatible with version < 1.1.0
const create = function create(options = {}) {
  return React.createClass({
    render() {
      return (
        <AjaxAutosuggest
          ref="AjaxAutosuggest"
          {...options}
        />
      );
    },
  });
};

module.exports = {
  AjaxAutosuggest,
  create
};