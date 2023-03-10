import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Grid, MenuItem, TextField, Typography} from "@mui/material";
import FileInput from "../../../components/UI/FileInput/FileInput";
import {ApiAlbum} from "../../../types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectArtists} from "../../artists/artistsSlice";
import {fetchArtists} from "../../artists/artistsThunks";
import {addAlbum} from "../albumsThunks";
import {useNavigate} from "react-router-dom";
import {selectAlbumAdding, selectAlbumError} from "../albumsSlice";

const AlbumForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const artists = useAppSelector(selectArtists);
    const error = useAppSelector(selectAlbumError);
    const albumAdding = useAppSelector(selectAlbumAdding);
    const [album, setAlbum] = useState<ApiAlbum>({
        title: '',
        artist: '',
        releasedAt: '',
        image: null
    });

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setAlbum(prev => {
            return {...prev, [name]: value}
        });
    };

    const inputFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        setAlbum(prev => ({
            ...prev, [name]: files && files[0] ? files[0] : null,
        }));
    };

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(addAlbum(album)).unwrap();
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
                > Add new album </Typography>
                <Grid item xs>
                    <TextField
                        select
                        id="artist"
                        label="Artist"
                        name="artist"
                        value={album.artist}
                        onChange={inputChangeHandler}
                        required
                        error={Boolean(getFieldError('artist'))}
                        helperText={getFieldError('artist')}

                    >
                        <MenuItem value="" disabled>Please select artist</MenuItem>
                        {artists.map(artist => (
                            <MenuItem
                                key={artist._id}
                                value={artist._id}
                            >
                                {artist.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs>
                    <TextField
                        id="title"
                        label="Title"
                        name="title"
                        value={album.title}
                        onChange={inputChangeHandler}
                        required
                        error={Boolean(getFieldError('title'))}
                        helperText={getFieldError('title')}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="releasedAt"
                        label="Released at"
                        name="releasedAt"
                        value={album.releasedAt}
                        onChange={inputChangeHandler}
                        required
                        error={Boolean(getFieldError('releasedAt'))}
                        helperText={getFieldError('releasedAt')}
                    />
                </Grid>

                <Grid item xs>
                    <FileInput
                        onChange={inputFileChangeHandler}
                        name="image"
                        label="image"
                    />
                </Grid>


                <Grid item xs>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={albumAdding}
                    >
                        {albumAdding ?
                            <Box sx={{display: 'flex'}}>
                                <CircularProgress/>
                            </Box> :
                            "Add album"
                        }
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default AlbumForm;