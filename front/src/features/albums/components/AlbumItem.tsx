import React from 'react';
import {Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, styled} from "@mui/material";
import noImageAvailable from "../../../assets/images/noImageAvailable.jpg";
import {apiURL} from "../../../constants";
import {Link} from "react-router-dom";

interface Props {
    id: string,
    title: string,
    image: string,
    releasedAt: number
}

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

const AlbumItem: React.FC<Props> = ({id, title, image, releasedAt}) => {
    let cardImage = noImageAvailable;
    if (image) {
        cardImage = apiURL + '/' + image;
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card component={Link} to={'/tracks/' + id}>
                <CardActionArea>
                    <CardHeader title={title}/>
                    <ImageCardMedia image={cardImage} title={title}/>
                    <CardContent>
                        The album was released in {releasedAt} year
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default AlbumItem;