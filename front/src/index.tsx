import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './theme';
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import {Provider} from "react-redux";
import {store} from "./app/store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
      <Provider store={store}>
          <BrowserRouter>
              <ThemeProvider theme={theme}>
                  <App />
              </ThemeProvider>
          </BrowserRouter>
      </Provider>
);

