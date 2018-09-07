import React from 'react';
import { render } from 'react-dom';


import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
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

const muitheme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
  typography: {
    display3: {
      color: 'rgba(255, 255, 255, 1)'
    }
  }
});

document.body.style.background = "black";

render( 
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CssBaseline/>
        <MuiThemeProvider theme={muitheme}>
          <App />
        </MuiThemeProvider> 
      </PersistGate>
    </Provider>,
document.getElementById('app') );
