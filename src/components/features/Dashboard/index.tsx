import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Forbidden from './../../utils/Forbidden';
import { mainListItems, SecondListItem } from './config/ListItem';
const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const mdTheme = createTheme();

const Dashboard: React.FC = () => {
    const [open, setOpen] = React.useState(true);
    const [isLogin, setIsLogin] = React.useState<string | null>(
        localStorage.getItem('isLogin')
    );
    const [role, setRole] = React.useState<string | null>(
        localStorage.getItem('role')
    );

    const navigate = useNavigate();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const logout = () => {
        localStorage.removeItem('isLogin');
        localStorage.removeItem('role');
        setIsLogin(null);
        setRole(null);
        navigate('/');
    };

    if (!isLogin && role !== 'admin') return <Forbidden />;
    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }} className='dashboard'>
                <CssBaseline />
                <AppBar position='absolute' open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px',
                            backgroundColor: '#fff',
                            color: '#778599',
                        }}
                    >
                        <IconButton
                            edge='start'
                            color='secondary'
                            aria-label='open drawer'
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                                color: '#123 !important',
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div className='flex justify-between items-center w-full'>
                            {/* <NavLink to='/'> */}
                            <Typography
                                component='h1'
                                variant='h6'
                                color='inherit'
                            >
                                DASHBOARD
                            </Typography>
                            {/* </NavLink> */}
                            <IconButton
                                sx={{
                                    p: '10px',
                                    marginLeft: '10px',
                                    color: '#eb2066',
                                }}
                                aria-label='cart'
                                onClick={logout}
                            >
                                <LogoutIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer variant='permanent' open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            px: [1],
                            backgroundColor: '#0f172a',
                            color: '#fffff6',
                        }}
                    >
                        <img
                            src='https://res.cloudinary.com/dqrkqvtjg/image/upload/v1652195303/Flower-store/logo-white_uohlt8.png'
                            className='h-16 object-cover'
                            alt=''
                        />
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <List
                        component='nav'
                        sx={{ backgroundColor: '#0f172a', color: '#fffff6' }}
                    >
                        {mainListItems}
                        <Divider sx={{ my: 1 }} />
                        <SecondListItem />
                    </List>
                </Drawer>
                <Box
                    component='main'
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Grid
                        container
                        className='w-[100%] h-[calc(100%-120px)] mt-3 px-2'
                    >
                        <Outlet />
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Dashboard;
