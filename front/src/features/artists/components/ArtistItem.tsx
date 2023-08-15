import React from 'react';
import {Link} from "react-router-dom";
import noImageAvailable from '../../../assets/images/noImageAvailable.jpg';
import {apiURL} from "../../../constants";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectUser} from "../../users/usersSlice";
import {selectArtistDeleteError, selectArtistDeleting, selectArtistToggling} from "../artistsSlice";
import {deleteArtist, fetchArtists, togglePublished} from "../artistsThunks";
import {
    Alert,
    Box,
    Button,
    Card,
    CardActionArea, CardActions,
    CardContent,
    CardHeader,
    CardMedia, CircularProgress,
    Grid,
    styled,
    Typography
} from "@mui/material";


const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

interface Props {
    id: string,
    name: string,
    image: string,
    isPublished: boolean
}

const ArtistItem: React.FC<Props> = ({id, name, image, isPublished}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const deleting = useAppSelector(selectArtistDeleting);
    const toggling = useAppSelector(selectArtistToggling);
    const error = useAppSelector(selectArtistDeleteError);


    let cardImage = noImageAvailable;
    if (image) {
        cardImage = apiURL + '/' + image;
    }

    const handleDelete = async (id: string) => {
        await dispatch(deleteArtist(id)).unwrap();
        await dispatch(fetchArtists());
    };

    const handleTogglePublish = async (id: string) => {
        await dispatch(togglePublished(id));
        await dispatch(fetchArtists());
    };

    return (

        <Grid item xs={12} sm={6} md={4} lg={3}>
            <div style={{ position: 'relative' }}>
                {error && error.id === id &&
                    (<Alert severity="error" sx={{ width: '100%', position: 'absolute', zIndex: 1  }}>
                            {error.error}
                        </Alert>
                    )}
            <Card>
                <CardActionArea component={Link} to={'/albums/' + id}>
                    <CardHeader title={name}/>
                    <ImageCardMedia image={cardImage} title={name}/>
                </CardActionArea>

                {user?.role === 'admin'  &&
                    <CardContent>
                        <Typography>{isPublished ? 'Artist was published' : 'Artist is not published yet'} </Typography>
                        <CardActions>
                            <Button
                                variant="contained"
                                onClick={() => handleDelete(id)}
                                disabled={deleting}
                            >
                                {deleting ?
                                    <Box sx={{display: 'flex'}}>
                                        <CircularProgress/>
                                    </Box> : 'Delete'
                                }
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => handleTogglePublish(id)}
                                disabled={toggling}
                            >
                                {toggling ?
                                    <Box sx={{display: 'flex'}}>
                                        <CircularProgress/>
                                    </Box> : isPublished ? 'Unpublish' : 'Publish'
                                }
                            </Button>
                        </CardActions>
                    </CardContent>
                }
            </Card>
            </div>
        </Grid>
    );
};

export default ArtistItem;
