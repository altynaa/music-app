import React, { useState } from 'react';
import { User } from '../../../types';
import {Avatar, Button, Menu, MenuItem} from '@mui/material';
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks";
import {logout} from "../../../features/users/usersThunks";


interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
    };


    return (
        <>
            <Button
                onClick={handleClick}
                color="inherit"
            >
                Hello, {user.displayName}
                <Avatar sx={{ml: 2}} alt={user.displayName} src={user.image} />
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