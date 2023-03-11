import React from 'react';
import {Link, useParams} from "react-router-dom";
import noImageAvailable from "../../../assets/images/noImageAvailable.jpg";
import {apiURL} from "../../../constants";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia, CircularProgress,
    Grid,
    styled,
    Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectUser} from "../../users/usersSlice";
import {selectAlbumDeleting} from "../albumsSlice";
import {deleteAlbum, fetchAlbums} from "../albumsThunks";

interface Props {
    trackId: string,
    title: string,
    image: string,
    releasedAt: number,
    isPublished: boolean
}

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

const AlbumItem: React.FC<Props> = ({trackId, title, image, releasedAt, isPublished}) => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const user = useAppSelector(selectUser);
    const deleting = useAppSelector(selectAlbumDeleting);

    let cardImage = noImageAvailable;
    if (image) {
        cardImage = apiURL + '/' + image;
    }

    const handleDelete = async (trackId: string) => {
        await dispatch(deleteAlbum(trackId));
        await dispatch(fetchAlbums(id));
    };

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} style={{maxHeight: 5}}>
            <Card>
                <CardActionArea component={Link} to={'/tracks/' + id}>
                    <CardHeader title={title}/>
                    <ImageCardMedia image={cardImage} title={title}/>
                </CardActionArea>
                <CardContent>
                    The album was released in {releasedAt} year
                    {user?.role === 'admin' &&
                        <Box>
                            <Typography>{isPublished ? 'Album was published' : 'Album was not published yet'} </Typography>
                            <Button
                                variant="contained"
                                onClick={() => handleDelete(trackId)}
                                disabled={deleting}
                            >
                                {deleting ?
                                    <Box sx={{display: 'flex'}}>
                                        <CircularProgress/>
                                    </Box> : 'Delete'
                                }
                            </Button>
                        </Box>}
                </CardContent>

            </Card>
        </Grid>
    );
};

export default AlbumItem;