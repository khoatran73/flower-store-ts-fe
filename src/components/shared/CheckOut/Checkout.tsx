import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Divider, Grid, InputLabel, List, TextField } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { AccountDto } from '../../../types/auth/LoginDto';
import { CartDto } from '../../../types/cart/Cart';
import { CART_INDEX_API } from '../../features/ProductDetail/api';
import { CREATE_ORDER_API, GET_ACCOUNT } from './api';

function Copyright() {
    return (
        <Typography variant='body2' color='text.secondary' align='center'>
            {'Copyright © '}
            <Link color='inherit' href='/'>
                FlowerStore
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Checkout() {
    const { id } = useParams();
    const [cart, setCart] = useState<CartDto>();

    const [fullname, setFullname] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [account, setAccount] = useState<AccountDto>();

    const [isLogin, setIsLogin] = useState<string | null>(
        localStorage.getItem('isLogin')
    );

    useEffect(() => {
        fetchCart();
        fetchAccount();
    }, []);

    const fetchCart = () => {
        axios.get(CART_INDEX_API, { params: { id: id } }).then((res) => {
            if (res.data.success) {
                setCart(res.data.result[0] as CartDto);
            }
        });
    };
    const steps = [
        'Địa chỉ giao hàng',
        // 'Phương thức thanh toán',
        'Xem lại đơn hàng',
    ];

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return (
                    <React.Fragment>
                        <Box>
                            <Typography variant='h6' gutterBottom>
                                Địa chỉ giao hàng
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12}>
                                    <InputLabel>Họ tên</InputLabel>
                                    <TextField
                                        id='fullname'
                                        name='fullname'
                                        // label='n'
                                        fullWidth
                                        variant='standard'
                                        value={fullname}
                                        multiline={true}
                                        disabled
                                        // onChange={(e) =>
                                        //     setFullname(e.target.value)
                                        // }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel>Số điện thoại</InputLabel>
                                    <TextField
                                        id='phone'
                                        name='phone'
                                        fullWidth
                                        variant='standard'
                                        value={phone}
                                        multiline={true}
                                        disabled
                                        // onChange={(e) =>
                                        //     setPhone(e.target.value)
                                        // }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel>Email</InputLabel>
                                    <TextField
                                        id='email'
                                        name='email'
                                        fullWidth
                                        variant='standard'
                                        value={email}
                                        multiline={true}
                                        disabled
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InputLabel>Địa chỉ</InputLabel>
                                    <TextField
                                        id='address'
                                        name='address'
                                        fullWidth
                                        variant='standard'
                                        value={address}
                                        multiline={true}
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </React.Fragment>
                );
            // case 1:
            //     return <PaymentForm />;
            case 1:
                return (
                    <React.Fragment>
                        <Typography variant='h6' gutterBottom>
                            Chi tiết đơn hàng
                        </Typography>
                        <List disablePadding>
                            {cart?.cartDetails?.map((cartDetail) => (
                                <div className='flex justify-between align-center p-6 text-sm'>
                                    <div className='flex align-center flex-auto w-3/4'>
                                        <img
                                            src={cartDetail.product?.image}
                                            alt=''
                                            className='w-16'
                                        />
                                        <div className='ml-3 w-[240px]'>
                                            <div className='font-semibold text-sm truncate '>
                                                {cartDetail.product?.name}
                                            </div>
                                            <div className='font-semibold text-gray-600'>
                                                {cartDetail.product?.unitPrice.toLocaleString()}
                                                đ
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex justify-between align-center flex-1'>
                                        <div className='w-[75px]'>
                                            <div className='border border-gray-100 bg-gray-100 text-center w-6 h-6 rounded'>
                                                {cartDetail.quantity}
                                            </div>
                                            <div className='font-semibold  '>
                                                {cartDetail.price?.toLocaleString()}
                                                đ
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Divider />
                            <div className='flex flex-col justify-between px-6 py-3'>
                                <div className='flex justify-between mb-3'>
                                    <div className='uppercase font-normal text-sm'>
                                        Tổng tiền:
                                    </div>
                                    <div className='text-red-500'>
                                        {cart?.totalPrice?.toLocaleString()}₫
                                    </div>
                                </div>
                            </div>
                        </List>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <div>
                                    <span className='text-xl font-semibold '>
                                        {account?.fullname}
                                    </span>
                                </div>
                                <div className='flex'>
                                    <div className='text-md mr-2'>
                                        Địa chỉ:{' '}
                                    </div>
                                    <span className='text-md font-normal '>
                                        {account?.address}
                                    </span>
                                </div>
                                <div className='flex'>
                                    <div className='text-md mr-2'>SDT: </div>
                                    <span className='text-md font-normal '>
                                        {account?.phone}
                                    </span>
                                </div>
                                <div className='flex'>
                                    <div className='text-md mr-2'>Email: </div>
                                    <span className='text-md font-normal '>
                                        {account?.email}
                                    </span>
                                </div>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                );
            default:
                throw new Error('Unknown step');
        }
    }

    const fetchAccount = async () => {
        const res = await axios.get(GET_ACCOUNT + '/' + isLogin);
        setAccount(res.data.result);
        if (res.data.result) {
            setFullname(res.data.result.fullname);
            setPhone(res.data.result.phone);
            setEmail(res.data.result.email);
            setAddress(res.data.result.address);
        }
    };

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleSubmit = async () => {
        const body = {
            cartId: cart?.id,
            customerId: isLogin,
            totalPrice: cart?.totalPrice,
        };

        await axios.post(CREATE_ORDER_API, body);

        handleNext();
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
                position='absolute'
                color='default'
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <NavLink to={'/'} className='flex items-center'>
                        <KeyboardBackspaceIcon fontSize='large' />
                    </NavLink>
                </Toolbar>
            </AppBar>
            <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
                <Paper
                    variant='outlined'
                    sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                >
                    <Typography component='h1' variant='h4' align='center'>
                        Thanh toán
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel sx={{ color: 'red' }}>
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant='h5' gutterBottom>
                                    Cảm ơn vì bạn đã tin tưởng và đặt hàng
                                </Typography>
                                <Typography variant='subtitle1'>
                                    Đơn hàng của bạn sẽ sớm được ship đến.
                                </Typography>
                                <div className='mt-3 text-blue-400'>
                                    <NavLink to='/'>
                                        <Typography variant='subtitle1'>
                                            <KeyboardBackspaceIcon /> Trang chủ
                                        </Typography>
                                    </NavLink>
                                </div>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    {activeStep !== 0 && (
                                        <Button
                                            onClick={handleBack}
                                            sx={{
                                                mt: 3,
                                                ml: 1,
                                                color: '#eb2066',
                                            }}
                                        >
                                            Trở về
                                        </Button>
                                    )}

                                    {activeStep === steps.length - 1 ? (
                                        <button
                                            className='custom-button mt-5 ml-2'
                                            onClick={handleSubmit}
                                        >
                                            Xác nhận
                                        </button>
                                    ) : (
                                        <button
                                            className='custom-button mt-3'
                                            onClick={handleNext}
                                        >
                                            Tiếp theo
                                        </button>
                                    )}
                                </Box>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}
