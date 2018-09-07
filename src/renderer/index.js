import React from 'react';
import { render } from 'react-dom';
import App from './App';

import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './reducers'
import { setOnline } from './actions';
import createElectronStorage from "redux-persist-electron-storage";
const persistConfig = {
  key: 'root',
  storage: createElectronStorage(),
  blacklist: ['status'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
let persistor = persistStore(store)


console.log("renderer.js","start");

const alertOnlineStatus = () => {
  if (navigator.onLine) {
    console.log("Electron is online")
    store.dispatch(setOnline(true));
  } else {
    console.log("Electron is offline")
    store.dispatch(setOnline(false));
  } 
}

window.addEventListener('online',  alertOnlineStatus)
window.addEventListener('offline',  alertOnlineStatus)


alertOnlineStatus();



render( 
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
document.getElementById('app') );
