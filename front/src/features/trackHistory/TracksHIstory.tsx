import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../users/usersSlice";
import {fetchTrackHistory} from "./trackHistoriesThunks";
import {selectTrackHistories, selectTracksHistLoading} from "./trackHistoriesSlice";
import {useNavigate} from "react-router-dom";
import {Box,  CircularProgress, Grid} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import dayjs from "dayjs";

const TracksHistory = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const history = useAppSelector(selectTrackHistories);
    const trackHistoryLoading = useAppSelector(selectTracksHistLoading);

    useEffect(() => {
        dispatch(fetchTrackHistory());
    }, [dispatch]);

    if (!user) {
        navigate('/login');
    }

    return (
        <>
            <h2>Here goes list of tracks that were listened by {user?.username} </h2>
            <Grid item container spacing={2}>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Name of track</TableCell>
                                <TableCell align="left">Artist</TableCell>
                                <TableCell align="left">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trackHistoryLoading ? <Box sx={{display: 'flex'}}>
                                <CircularProgress/>
                            </Box> : history.map((item) => (
                                <TableRow
                                    key={item._id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {item.track.title}
                                    </TableCell>
                                    <TableCell align="left">{item.artist.name}</TableCell>
                                    <TableCell align="left">{dayjs(item.datetime).format('DD.MM.YYYY HH:mm:ss')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

        </>
    );
};

export default TracksHistory;