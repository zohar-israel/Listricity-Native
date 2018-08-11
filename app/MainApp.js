import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import React, { Component, Alert } from 'react'
import { Provider } from 'react-redux'
import mainApp from './core-module/reducers'
import MainViewContainer from './containers/MainViewContainer'
import { PersistGate } from 'redux-persist/lib/integration/react';
import FilesystemStorage from 'redux-persist-filesystem-storage'

import { persistStore, persistReducer, autoRehydrate } from 'redux-persist';
import SplashScreen from './components/SplashScreen'
import { YellowBox, NetInfo } from 'react-native'
import { possiblyLoadFromBackup, loadFromBackup } from './bll/playlists/restore'
import { networkStatus } from './core-module/actions'
import config from './config'


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const rootReducer = (state, action) => {
    return mainApp(state, action);
}

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
        NetInfo.getConnectionInfo().then(this.handleConnectivityChange);
        NetInfo.addEventListener(
            'connectionChange',
            this.handleConnectivityChange
        );
    }
    componentWillUnmount() {
        NetInfo.removeEventListener(
            'connectionChange',
            this.handleConnectivityChange
        );
    }
    handleConnectivityChange = (connectionInfo) => {
        store.dispatch(networkStatus(!(connectionInfo.type === 'none' || connectionInfo.type === 'unknown')))
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