import {
    CssBaseline,
    Paper,
    Box,
    TextField,
    Typography,
    Grid,
    Button,
    Avatar,
} from '@mui/material';
import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import LockResetIcon from '@mui/icons-material/LockReset';
import axios from 'axios';
import { API_URL } from '../../../constant';
import Swal from 'sweetalert2';

const theme = createTheme();

export const ResetPassword = () => {
    const navigate = useNavigate();
    const isLogin = localStorage.getItem('isLogin');
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const oldPassword = data.get('oldPassword');
        const newPassword = data.get('newPassword');
        const confirmNewPassword = data.get('confirmNewPassword');

        console.log(oldPassword, newPassword, confirmNewPassword);
        axios
            .post(`${API_URL}/auth/reset-password`, {
                id: isLogin,
                oldPassword,
                newPassword,
                confirmNewPassword,
            })
            .then((res) => {
                const data = res.data;
                if (data.success) {
                    localStorage.removeItem('isLogin');
                    localStorage.removeItem('role');
                    localStorage.removeItem('storeId');
                    localStorage.removeItem('image');

                    Swal.fire({
                        title: 'Đổi mật khẩu thành công!',
                        showCancelButton: false,
                        confirmButtonText: 'Đăng nhập',
                        // cancelButtonText: 'Hủy',
                        icon: 'success',
                    }).then((res) => {
                        if (res.isConfirmed) {
                            navigate('/login');
                        }
                    });
                }
            })
            .catch((err) => {
                Swal.fire(
                    'Thông báo',
                    'Đổi mật khẩu không thành công, hãy thử lại!',
                    'error'
                );
            });
    };
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
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockResetIcon />
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                            Đổi mật khẩu
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
                                id='oldPassword'
                                label='Mật khẩu cũ'
                                name='oldPassword'
                                autoFocus
                                type='password'
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                name='newPassword'
                                label='Mật khẩu mới'
                                type='password'
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                name='confirmNewPassword'
                                label='Nhập lại mật khẩu mới'
                                type='password'
                            />
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Xác nhận
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link
                                        to='/'
                                        className='underline text-blue-500'
                                    >
                                        Trang chủ
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};
