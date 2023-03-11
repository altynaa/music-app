import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectTrackDeleting, selectTracks, selectTracksLoading} from "./tracksSlice";
import {deleteTrack, fetchTracks} from "./tracksThunks";
import {fetchOneAlbum} from "../albums/albumsThunks";
import {selectOneAlbum} from "../albums/albumsSlice";
import {selectUser} from "../users/usersSlice";
import {addTrackHistory} from "../trackHistory/trackHistoriesThunks";
import {HistoryMutation} from "../../types";
import {selectTracksHistAdding} from "../trackHistory/trackHistoriesSlice";
import {Box, Button, CircularProgress, Grid, Typography} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';

const Tracks = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const tracks = useAppSelector(selectTracks);
    const tracksLoading = useAppSelector(selectTracksLoading);
    const album = useAppSelector(selectOneAlbum);
    const user = useAppSelector(selectUser);
    const trackAdding = useAppSelector(selectTracksHistAdding);
    const deleting = useAppSelector(selectTrackDeleting);

    useEffect(() => {
        if (id) {
            dispatch(fetchTracks(id));
            dispatch(fetchOneAlbum(id))
        }
    }, [dispatch]);

    const addTrackToHistory = async (track: HistoryMutation) => {
        await dispatch(addTrackHistory(track));
    };

    const handleDelete = async (trackId: string) => {
        await dispatch(deleteTrack(trackId));
        if (id) {
            await dispatch(fetchTracks(id));
        }
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
            {tracksLoading ?
                <Box sx={{display: 'flex'}}> <CircularProgress/> </Box>
                :
                <Grid item container spacing={2}>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Order number in the album</TableCell>
                                    <TableCell align="left">Name of track</TableCell>
                                    <TableCell align="left">Time</TableCell>
                                    {user && <TableCell align="center">Play</TableCell>}
                                    {user?.role === 'admin' && <TableCell align="left">Info</TableCell>}
                                    {user?.role === 'admin' && <TableCell align="center">Delete</TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tracks.map((track) => (
                                    <TableRow
                                        key={track._id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell align="left">
                                            {track.ordNumber}
                                        </TableCell>
                                        <TableCell align="left">{track.title}</TableCell>
                                        <TableCell align="left">{track.length}</TableCell>
                                        {user &&
                                            <TableCell align="center">
                                                <Button
                                                    onClick={() => addTrackToHistory({track: track._id})}
                                                    disabled={trackAdding}
                                                >
                                                    <PlayArrowIcon/>
                                                </Button>
                                            </TableCell>
                                        }
                                        {user?.role === 'admin' &&
                                            <TableCell align="left">
                                                {track.isPublished ? 'Track was published' : 'Track was not published yet'}
                                            </TableCell>
                                        }
                                        {user?.role === 'admin' &&
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleDelete(track._id)}
                                                    disabled={deleting}
                                                >

                                                    {deleting ?
                                                        <Box sx={{display: 'flex'}}>
                                                        <CircularProgress/>
                                                        </Box> :  <DeleteIcon/>
                                                    }
                                                </Button>
                                            </TableCell>
                                        }
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>}
        </Grid>
    );
};

export default Tracks;

