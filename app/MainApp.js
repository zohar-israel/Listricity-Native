import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import React, { Component, Alert } from 'react'
import { Provider } from 'react-redux'
import mainApp from './core-module/reducers'
import MainViewContainer from './containers/MainViewContainer'
import { PersistGate } from 'redux-persist/lib/integration/react';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer, autoRehydrate } from 'redux-persist';
import SplashScreen from './components/SplashScreen'
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const rootReducer = (state, action) => {
    return mainApp(state, action);
}


const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['appReducers', 'flowReducers']
};

const pReducer = persistReducer(persistConfig, rootReducer);

const logger = createLogger();

// const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
const store = createStore(
    pReducer,
    {},
    compose(
        //autoRehydrate(),
        applyMiddleware(thunk)
    )
)
const persistor = persistStore(store);

class MainApp extends Component {
    render() {
        return (
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