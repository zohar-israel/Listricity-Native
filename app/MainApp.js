import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import React, { Component, Alert } from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'
import mainApp from './core-module/reducers'
import MainViewContainer from './containers/MainViewContainer'
import { PersistGate } from 'redux-persist/lib/integration/react';
import FilesystemStorage from 'redux-persist-filesystem-storage'

import { persistStore, persistReducer, autoRehydrate } from 'redux-persist';
import SplashScreen from './components/SplashScreen'
import { YellowBox, NetInfo } from 'react-native'
import { possiblyLoadFromBackup, loadFromBackup } from './bll/playlists/restore'
import { importPlaylist } from './bll/playlists/importPlaylist'
import { networkStatus } from './core-module/actions'
import config from './config'

import { DeviceEventEmitter } from 'react-native';

// suppress meaningless debug message
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

// prevent font scaling
if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

const rootReducer = (state, action) => {
    return mainApp(state, action);
}

// code supports persitance by redux-presist
// now unused since own brwoed solution works better
// and supports sharing of playlists

const persistConfig = {
    key: 'root',
    storage: FilesystemStorage,
    whitelist: ['appReducers', 'flowReducers']
};

const pReducer = persistReducer(persistConfig, rootReducer);

const usePersistor = config.usePersistor

const store = !usePersistor
    ? createStore(rootReducer, compose(applyMiddleware(thunk)))
    : createStore(
        pReducer,
        {},
        compose(
            //autoRehydrate(),
            applyMiddleware(thunk)
        )
    )

const persistor = persistStore(store, {}, () => possiblyLoadFromBackup(store));

if (!usePersistor) loadFromBackup(store)

class MainApp extends Component {
    componentDidMount() {
        // listen to network state
        // and for playlist import
        NetInfo.getConnectionInfo().then(this.handleConnectivityChange);
        NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
        DeviceEventEmitter.addListener('onPlaylistOpened', this.onPlaylistImported);
    }
    componentWillUnmount() {
        // DeviceEventEmitter.removeEventListener occationally throws an error
        try {
            NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
            DeviceEventEmitter.removeEventListener('onPlaylistOpened', this.onPlaylistImported);
        } catch (e) { }
    }
    handleConnectivityChange = (connectionInfo) => {
        store.dispatch(networkStatus(!(connectionInfo.type === 'none' || connectionInfo.type === 'unknown')))
    }
    onPlaylistImported(event) {
        // if app was launched by importing a playlist
        // wait until load is done
        function doImport() {
            if (store.getState().appReducers.loadFinished)
                importPlaylist(event.sharedplaylist, store)
            else {
                console.warn('waiting for load to finish')
                setTimeout(doImport, 1000)
            }
        }
        doImport()
    }

    render() {
        return (
            !usePersistor ?
                <Provider store={store}>
                    <MainViewContainer />
                </Provider>
                :
                <Provider store={store}>
                    <PersistGate
                        loading={<SplashScreen />}
                        persistor={persistor}>
                        <MainViewContainer />
                    </PersistGate>
                </Provider>
        );
    }
}

export default MainApp;