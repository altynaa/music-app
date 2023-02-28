import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectTracks, selectTracksLoading} from "./tracksSlice";
import {fetchTracks} from "./tracksThunks";
import {fetchOneAlbum} from "../albums/albumsThunks";
import {selectOneAlbum} from "../albums/albumsSlice";
import {Box, Button, CircularProgress, Grid, Typography} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {selectUser} from "../users/usersSlice";
import {addTrackHistory} from "../trackHistory/trackHistoriesThunks";
import {HistoryMutation} from "../../types";

const Tracks = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const tracks = useAppSelector(selectTracks);
    const tracksLoading = useAppSelector(selectTracksLoading);
    const album = useAppSelector(selectOneAlbum);
    const user = useAppSelector(selectUser);


    useEffect(() => {
        if (id) {
            dispatch(fetchTracks(id));
            dispatch(fetchOneAlbum(id))
        }
    }, [dispatch]);

    const addTrackToHistory = async (track: HistoryMutation) => {
        await dispatch(addTrackHistory(track));
    };

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h4">
                        Tracks of {album.artist.name}
                    </Typography>
                    <p> "{album.title}" Album </p>
                </Grid>
            </Grid>
            <Grid item container spacing={2}>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="left">Name of track</TableCell>
                                <TableCell align="left">Time</TableCell>
                                {user &&  <TableCell align="center">Play</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tracksLoading ? <Box sx={{display: 'flex'}}>
                                <CircularProgress/>
                            </Box> : tracks.map((track) => (
                                <TableRow
                                    key={track._id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {track.ordNumber}
                                    </TableCell>
                                    <TableCell align="left">{track.title}</TableCell>
                                    <TableCell align="left">{track.length}</TableCell>
                                    {user &&  <TableCell align="center">
                                        <Button onClick={() => addTrackToHistory({track: track._id})}> <PlayArrowIcon/></Button>
                                    </TableCell>}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default Tracks;

