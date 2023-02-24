import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import App from './App';
import {store} from "./app/store";
import theme from './theme';
import {ThemeProvider} from "@mui/material";

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

