import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolBar from "./components/UI/AppToolBar/AppToolBar";
import Artists from "./features/artists/Artists";
import {Route, Routes} from "react-router-dom";
import Albums from "./features/albums/Albums";
import Tracks from "./features/tracks/Tracks";

function App() {
    return (
        <>
            <CssBaseline/>
            <header>
                <AppToolBar/>
            </header>
            <main>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/" element={<Artists/>}/>
                        <Route path="/albums/:id" element={<Albums/>}/>
                        <Route path="/tracks/:id" element={<Tracks/>}/>
                    </Routes>
                </Container>
            </main>

        </>
    );
}

export default App;
