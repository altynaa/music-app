import React, {useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {LoginMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectLoginError, selectLoginLoading} from "./usersSlice";
import {login} from "./usersThunks";
import {
    Alert,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Link,
    TextField,
    Typography
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {GoogleLogin} from "@react-oauth/google";


const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector(selectLoginError);
    const logining = useAppSelector(selectLoginLoading);

    const [logState, setLogState] = useState<LoginMutation>({
        username: '',
        password: ''
    });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLogState(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(login(logState)).unwrap();
        navigate('/')
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                style={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOpenIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box sx={{pt: 2}}>
                    <GoogleLogin onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login failed');
                    }}
                    />
                </Box>
                {error && (
                    <Alert severity="error" sx={{mt: 3, width: '100%'}}>
                        {error.error}
                    </Alert>)}
                <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Username"
                                name="username"
                                autoComplete="current-username"
                                value={logState.username}
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={logState.password}
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        disabled={logining}
                    >
                        {logining ?
                            (<Box sx={{display: 'flex'}}>
                                <CircularProgress/>
                            </Box>) : "Sign In"}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/register" variant="body2">
                                Or sign up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;