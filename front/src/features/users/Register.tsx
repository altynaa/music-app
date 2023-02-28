import React, {useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {RegistrationMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {register} from "./usersThunks";
import {selectRegisterError, selectRegisterLoading} from "./usersSlice";
import {Avatar, Box, Button, CircularProgress, Container, Grid, Link, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const Register = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector(selectRegisterError);
    const registering = useAppSelector(selectRegisterLoading);

    const [regState, setRegState] = useState<RegistrationMutation>({
        username: '',
        password: ''
    });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setRegState(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(register(regState)).unwrap();
            navigate('/');
        } catch (e) {
            throw new Error('Something went wrong');
        }
    };

    const getFieldError = (fieldname: string) => {
        try {
            return error?.errors[fieldname].message;
        } catch {
            return undefined
        }
    };
    
    return (
        <Container component="main" maxWidth="xs">
            <Box
                style={{
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>

                <Box component="form" onSubmit={submitFormHandler} sx={{mt: 2}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Username"
                                name="username"
                                autoComplete="new-username"
                                value={regState.username}
                                onChange={inputChangeHandler}
                                error={Boolean(getFieldError('username'))}
                                helperText={getFieldError('username')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                name="password"
                                autoComplete="new-password"
                                value={regState.password}
                                onChange={inputChangeHandler}
                                error={Boolean(getFieldError('password'))}
                                helperText={getFieldError('password')}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 2, mb: 2}}
                        disabled={registering}
                    >
                        {registering ? (<Box sx={{display: 'flex'}}>
                            <CircularProgress/>
                        </Box>) :  "Sign up"}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Link component={RouterLink} to="/login" variant="body2">Already have an account? Sign in!</Link>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;