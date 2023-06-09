import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import FileInput from "../../../components/UI/FileInput/FileInput";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {ApiArtist} from "../../../types";
import {addArtist} from "../artistsThunks";
import {Box, CircularProgress, Grid, TextField, Typography} from '@mui/material';
import {Button} from "@mui/material";
import {selectArtistAdding} from "../artistsSlice";

const ArtistForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const artistAdding = useAppSelector(selectArtistAdding);
    const [artist, setArtist] = useState<ApiArtist>({
        name: '',
        information: '',
        image: null
    });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setArtist(prev => {
            return {...prev, [name]: value}
        });
    };

    const inputFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        setArtist(prev => ({
            ...prev, [name]: files && files[0] ? files[0] : null,
        }));
    };

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(addArtist(artist));
        navigate('/artists');
    };

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid container direction="column" spacing={2}>
                <Typography
                    variant="h3"
                > Add new artist </Typography>
                <Grid item xs>
                    <TextField
                        id="name"
                        label="Name"
                        name="name"
                        value={artist.name}
                        onChange={inputChangeHandler}
                        required
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="information"
                        label="Information"
                        name="information"
                        value={artist.information}
                        onChange={inputChangeHandler}
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
                        disabled={artistAdding}
                    >
                        {artistAdding ?
                            <Box sx={{display: 'flex'}}>
                                <CircularProgress/>
                            </Box> :
                            "Add artist"
                        }
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ArtistForm;