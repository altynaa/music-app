import React, {useEffect} from 'react';
import ArtistItem from "./components/ArtistItem";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectArtists, selectArtistsLoading} from "./artistsSlice";
import {fetchArtists} from "./artistsThunks";
import {Box, CircularProgress, Grid, Typography} from "@mui/material";

const Artists = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const artistsLoading = useAppSelector(selectArtistsLoading);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h4">
                        Artists
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container spacing={2}>
                {artistsLoading ?
                    <Box sx={{display: 'flex'}}>
                        <CircularProgress/>
                    </Box> :
                    artists.map(artist => (
                        <ArtistItem
                            key={artist._id}
                            id={artist._id}
                            name={artist.name}
                            image={artist.image}
                        />
                    ))}
            </Grid>
        </Grid>
    );
};

export default Artists;