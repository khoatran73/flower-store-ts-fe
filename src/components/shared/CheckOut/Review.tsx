import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import { CartDetailDto, CartDto } from '../../../types/cart/Cart';
import { AccountDto } from '../../../types/auth/LoginDto';

import axios from 'axios';
import { CART_INDEX_API } from '../../features/ProductDetail/api';
import { Divider } from '@mui/material';
import { API_URL } from '../../../constant';

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];

export default function Review() {
    const { id } = useParams();
    const [cart, setCart] = React.useState<CartDto>();
    const [customer, setCustomer] = React.useState<AccountDto>();

    const [isLogin, setIsLogin] = React.useState<string | null>(
        localStorage.getItem('isLogin')
    );
    const [role, setRole] = React.useState<string | null>(
        localStorage.getItem('role')
    );

    React.useEffect(() => {
        fetchCart();
    }, [cart]);

    const fetchCart = () => {
        axios.get(CART_INDEX_API, { params: { id: id } }).then((res) => {
            if (res.data.success) {
                setCart(res.data.result[0] as CartDto);
            }
        });
    };

    const fetchCustomer = () => {
        axios.get(`${API_URL}/user`);
    };

    // const

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
                                    {cartDetail.price?.toLocaleString()}đ
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
                            {cart?.totalPrice?.toLocaleString()}đ
                        </div>
                    </div>
                </div>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>John Smith</Typography>
                    <Typography gutterBottom>{addresses.join(', ')}</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
