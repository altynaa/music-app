import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolBar from "./components/UI/AppToolBar/AppToolBar";
import Artists from "./features/artists/Artists";
import {Route, Routes} from "react-router-dom";
import Albums from "./features/albums/Albums";

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
                        <Route path="/albums?artist=:id" element={<Albums/>}/>
                    </Routes>
                </Container>
            </main>

        </>
    );
}

export default App;
