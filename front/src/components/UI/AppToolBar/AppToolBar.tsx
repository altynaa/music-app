import React from 'react';
import {NavLink} from "react-router-dom";
import AnonymousMenu from "./AnonymousMenu";
import {AppBar, Grid, styled, Toolbar, Typography} from "@mui/material";
import {useAppSelector} from "../../../app/hooks";
import {selectUser} from "../../../features/users/usersSlice";
import UserMenu from "./UserMenu";

const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit'
    },
});

const AppToolBar = () => {
    const user = useAppSelector(selectUser);
    return (
        <AppBar position="sticky" sx={{mb: 2}} >
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center"  >
                    <Typography variant="h6" component="div">
                      <Link to="/">Music app</Link>
                    </Typography>
                    <Grid item>
                        {user ? (<UserMenu user={user}/>) : <AnonymousMenu/>}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolBar;