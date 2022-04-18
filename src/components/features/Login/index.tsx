import HomeIcon from '@mui/icons-material/Home';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

const theme = createTheme();

export default function Login() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            username: data.get('username'),
            password: data.get('password'),
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component='main' sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
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
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
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
                            Đăng nhập
                        </Typography>
                        <Box
                            component='form'
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='username'
                                label='Tài khoản'
                                name='username'
                                autoComplete='username'
                                autoFocus
                            />
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                name='password'
                                label='Mật khẩu'
                                type='password'
                                id='password'
                                autoComplete='current-password'
                            />
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Đăng nhập
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href='#' variant='body2'>
                                        Quên mật khẩu
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <span className='mr-2'>
                                        Bạn chưa có tài khoản?
                                    </span>
                                    <Link href='/register' variant='body2'>
                                        Đăng ký
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
