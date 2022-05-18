import HomeIcon from '@mui/icons-material/Home';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API_REGISTER } from '../../../constant';
const theme = createTheme();

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        event.preventDefault();
        setLoading(true);
        axios
            .post(API_REGISTER, {
                username: formData.get('username'),
                password: formData.get('password'),
                confirmPassword: formData.get('confirmPassword'),
            })
            .then((res) => {
                const data = res.data;
                if (data.success) {
                    setLoading(false);
                    Swal.fire(
                        'Thông báo',
                        'Đăng ký tài khoản thành công',
                        'success'
                    );
                    navigate('/login', { replace: true });
                }
            })
            .catch((err) => {
                Swal.fire(
                    'Thông báo',
                    'Đăng ký không thành công, hãy thử lại!',
                    'error'
                );
                setLoading(false);
            });
    };

    // if (loading) return <Loading loading={loading} />;
    return (
        <ThemeProvider theme={theme}>
            <Grid container component='main' sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    md={8}
                    sx={{
                        backgroundImage:
                            'url(https://images.unsplash.com/photo-1447875569765-2b3db822bec9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light'
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item md={4} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <NavLink to='/'>
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <HomeIcon />
                            </Avatar>
                        </NavLink>
                        <Typography component='h1' variant='h5'>
                            Đăng ký
                        </Typography>
                        <Box
                            component='form'
                            onSubmit={handleSubmit}
                            sx={{ mt: 1 }}
                            className='w-full'
                        >
                            <TextField
                                margin='normal'
                                fullWidth
                                id='username'
                                label='Tài khoản'
                                name='username'
                                autoFocus
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                name='password'
                                label='Mật khẩu'
                                type='password'
                                id='password'
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                name='confirmPassword'
                                label='Nhập lại mật khẩu'
                                type='password'
                                id='confirm-password'
                            />
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Đăng ký
                            </Button>
                            <Grid container>
                                <Grid item xs></Grid>
                                <Grid item>
                                    <span className='mr-2'>
                                        Bạn đã có tài khoản?
                                    </span>
                                    <Link
                                        to='/login'
                                        className='underline text-blue-500'
                                    >
                                        Đăng nhập
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
