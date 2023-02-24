import React, {useEffect} from 'react';
import {Grid, Typography} from "@mui/material";
import {selectAlbums, selectAlbumsLoading} from "./albumsSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchAlbums} from "./albumsThunks";
import {useParams} from "react-router-dom";
import AlbumItem from "./components/AlbumItem";

const Albums = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const albums = useAppSelector(selectAlbums);
    const albumsLoading = useAppSelector(selectAlbumsLoading);

    useEffect(() => {
        if (id) {
            dispatch(fetchAlbums(id));
        }
    }, [dispatch]);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h4">
                        Albums of the .....
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container spacing={2}>
                {albums.map(album => (
                    <AlbumItem
                        key={album._id}
                        id={album._id}
                        title={album.title}
                        image={album.image}
                        releasedAt={album.releasedAt}
                    />
                ))}
            </Grid>
        </Grid>
    );
};
export default Albums;