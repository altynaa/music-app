import React from 'react';
import {Card, CardActionArea, CardHeader, CardMedia, Grid, styled} from "@mui/material";
import noImageAvailable from '../../../assets/images/noImageAvailable.jpg';
import {apiURL} from "../../../constants";
import {Link} from "react-router-dom";


const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

interface Props {
    id: string,
    name: string,
    image: string
}

const ArtistItem: React.FC<Props> = ({id, name, image}) => {
    let cardImage = noImageAvailable;
    if (image) {
        cardImage = apiURL + '/' + image;
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card component={Link} to={'/albums?artist=' + id}>
                <CardActionArea >
                    <CardHeader title={name}/>
                    <ImageCardMedia image={cardImage} title={name}/>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default ArtistItem;
