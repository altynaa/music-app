import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolBar from "./components/UI/AppToolBar/AppToolBar";
import Artists from "./features/artists/Artists";
import {Route, Routes} from "react-router-dom";
import Albums from "./features/albums/Albums";
import Tracks from "./features/tracks/Tracks";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import TracksHistory from "./features/trackHistory/TracksHIstory";
import ArtistForm from "./features/artists/components/ArtistForm";
import ProtectedRoot from "./components/ProtectedRoot/ProtectedRoot";
import {useAppSelector} from "./app/hooks";
import {selectUser} from "./features/users/usersSlice";

function App() {
    const user = useAppSelector(selectUser);
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
                        <Route path="/artists" element={<Artists/>}/>
                        <Route path="/albums/:id" element={<Albums/>}/>
                        <Route path="/tracks/:id" element={<Tracks/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/tracks_history" element={<TracksHistory/>}/>
                        <Route path="/add-artist" element={(
                            <ProtectedRoot isAllowed={user}>
                                <ArtistForm/>
                            </ProtectedRoot>
                        )}/>
                        <Route path="*" element={<h2>Page not found</h2>}/>
                    </Routes>
                </Container>
            </main>

        </>
    );
}

export default App;
