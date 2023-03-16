import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import App from './App';
import {persistor, store} from "./app/store";
import theme from './theme';
import {ThemeProvider} from "@mui/material";
import {PersistGate} from "redux-persist/integration/react";
import {addInterceptors} from "./axiosApi";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "./constants";

addInterceptors(store);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
          <PersistGate persistor={persistor}>
              <BrowserRouter>
                  <ThemeProvider theme={theme}>
                      <App />
                  </ThemeProvider>
              </BrowserRouter>
          </PersistGate>

      </Provider>
    </GoogleOAuthProvider>
);

