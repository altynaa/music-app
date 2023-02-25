import React from 'react';
import {Button} from "@mui/material";
import {NavLink} from "react-router-dom";

const AnonymousMenu = () => {
    return (
        <>
         <Button component={NavLink} to="/register" color="inherit">Sign up</Button>
        </>
    );
};

export default AnonymousMenu;