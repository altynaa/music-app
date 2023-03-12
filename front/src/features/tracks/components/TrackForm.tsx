import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ApiTrack} from "../../../types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {fetchAlbums} from "../../albums/albumsThunks";
import {selectAlbums} from "../../albums/albumsSlice";
import {selectTrackAdding, selectTrackAddingError} from "../tracksSlice";
import {addTrack} from "../tracksThunks";
import {Box, Button, CircularProgress, Grid, MenuItem, TextField, Typography} from "@mui/material";

const TrackForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const albums = useAppSelector(selectAlbums);
    const error = useAppSelector(selectTrackAddingError);
    const trackAdding = useAppSelector(selectTrackAdding);
    const [track, setTrack] = useState<ApiTrack>({
        title: '',
        album: '',
        length: '',
        ordNumber: '',
    });

    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    const inputChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setTrack(prev => {
            return {...prev, [name]: value}
        });
    };

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(addTrack(track)).unwrap();
        navigate('/');
    };

    const getFieldError = (fieldname: string) => {
        try {
            return error?.errors[fieldname].message;
        } catch {
            return undefined
        }
    };

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid container direction="column" spacing={2}>
                <Typography
                    variant="h3"
                > Add new track </Typography>
                <Grid item xs>
                    <TextField
                        select
                        id="album"
                        label="Album"
                        name="album"
                        value={track.album}
                        onChange={inputChangeHandler}
                        required
                        error={Boolean(getFieldError('album'))}
                        helperText={getFieldError('album')}

                    >
                        <MenuItem value="" disabled>Please select album</MenuItem>
                        {albums.map(album => (
                            <MenuItem
                                key={album._id}
                                value={album._id}
                            >
                                {album.title}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs>
                    <TextField
                        id="title"
                        label="Title"
                        name="title"
                        value={track.title}
                        onChange={inputChangeHandler}
                        required
                        error={Boolean(getFieldError('title'))}
                        helperText={getFieldError('title')}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="length"
                        label="Length"
                        name="length"
                        value={track.length}
                        onChange={inputChangeHandler}
                        required
                        error={Boolean(getFieldError('length'))}
                        helperText={getFieldError('length')}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="ordNumber"
                        label="Number of order in album"
                        name="ordNumber"
                        value={track.ordNumber}
                        onChange={inputChangeHandler}
                        required
                        error={Boolean(getFieldError('ordNumber'))}
                        helperText={getFieldError('ordNumber')}
                    />
                </Grid>

                <Grid item xs>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={trackAdding}
                    >
                        {trackAdding ?
                            <Box sx={{display: 'flex'}}>
                                <CircularProgress/>
                            </Box> :
                            "Add track"
                        }
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default TrackForm;