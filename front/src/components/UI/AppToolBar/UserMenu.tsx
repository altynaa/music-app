import React, { useState } from 'react';
import { User } from '../../../types';
import {Avatar, Button, Menu, MenuItem} from '@mui/material';
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks";
import {logout} from "../../../features/users/usersThunks";
import noImageAvailable from "../../../assets/images/noImageAvailable.jpg";
import {apiURL} from "../../../constants";
import {fetchArtists} from "../../../features/artists/artistsThunks";


interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    let image = noImageAvailable;

    if (user.image != null) {
        image = apiURL + '/' + user.image;
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await dispatch(logout());
        await navigate('/');
        await dispatch(fetchArtists());
    };


    return (
        <>
            <Button
                onClick={handleClick}
                color="inherit"
            >
                {user.displayName}
                <Avatar sx={{ml: 2}} alt={user.displayName} src={image} />
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem component={Link} to="/tracks_history">Tracks History</MenuItem>
                <MenuItem component={Link} to="/add-artist">Add Artist</MenuItem>
                <MenuItem component={Link} to="/add-album">Add album</MenuItem>
                <MenuItem component={Link} to="/add-track">Add track</MenuItem>
                <MenuItem
                onClick={handleLogout}
                >Logout</MenuItem>
            </Menu>
        </>
    );
};
export default UserMenu;