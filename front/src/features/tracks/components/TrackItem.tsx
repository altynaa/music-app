import React from 'react';
import {Card, CardContent, CardHeader, Grid} from "@mui/material";

interface Props {
    title: string,
    length: string,
    ordNumber: number
}

const TrackItem: React.FC<Props> = ({title, length, ordNumber}) => {


    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                    <CardHeader title={title}/>
                    <CardContent>
                        <p>{ordNumber}</p>
                        <p>{length}</p>
                    </CardContent>
            </Card>
        </Grid>
    );
};

export default TrackItem;