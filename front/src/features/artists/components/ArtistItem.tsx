import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import noImageAvailable from '../../../assets/images/noImageAvailable.jpg';
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
import {selectArtistDeleting} from "../artistsSlice";
import {deleteArtist, fetchArtists} from "../artistsThunks";


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
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const deleting = useAppSelector(selectArtistDeleting);

    let cardImage = noImageAvailable;
    if (image) {
        cardImage = apiURL + '/' + image;
    }

    const handleDelete = async (id: string) => {
        await dispatch(deleteArtist(id));
        await dispatch(fetchArtists());
        navigate('/');
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardActionArea component={Link} to={'/albums/' + id}>
                    <CardHeader title={name}/>
                    <ImageCardMedia image={cardImage} title={name}/>
                </CardActionArea>

                {user?.role === 'admin' &&
                    <CardContent>
                        <Typography>{isPublished ? 'Artist was published' : 'Artist was not published yet'} </Typography>
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
                    </CardContent>
                }
            </Card>
        </Grid>
    );
};

export default ArtistItem;
