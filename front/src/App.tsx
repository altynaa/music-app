import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolBar from "./components/UI/AppToolBar/AppToolBar";

function App() {
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolBar/>
      </header>
      <main>
        <Container maxWidth="xl">

        </Container>
      </main>

    </>
  );
}

export default App;
