import React, {useEffect} from 'react';
import {Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectTracks, selectTracksLoading} from "./tracksSlice";
import {useParams} from "react-router-dom";
import {fetchTracks} from "./tracksThunks";
import TrackItem from "./components/TrackItem";
import {selectArtists} from "../artists/artistsSlice";
import {fetchArtists} from "../artists/artistsThunks";

const Tracks = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const tracks = useAppSelector(selectTracks);
    const tracksLoading = useAppSelector(selectTracksLoading);
    const artists = useAppSelector(selectArtists);

    useEffect(() => {
        if (id) {
            dispatch(fetchTracks(id));
            dispatch(fetchArtists)
        }
    }, [dispatch])
    console.log(artists);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h4">
                        Tracks of the
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container spacing={2}>
                {tracks.map(track => (
                    <TrackItem
                        key={track._id}
                        title={track.title}
                        length={track.length}
                        ordNumber={track.ordNumber}
                    />
                ))}
            </Grid>
        </Grid>
    );
};

export default Tracks;