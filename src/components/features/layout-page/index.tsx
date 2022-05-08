import { Outlet } from 'react-router-dom';
import Footer from './../../shared/Footer/Footer';
import Navbar from './../../shared/Nav/Navbar';
import ScrollTop from './../../shared/ScrollTop/ScrollTop';
import PhoneIcon from '@mui/icons-material/Phone';
import { Container } from '@mui/material';
import React from 'react';
import axios from 'axios';

const LayoutPage: React.FC = () => {
    // const [isLogin, setIsLogin] = React.useState<string | null>();
    // const [role, setRole] = React.useState<string | null>();
    // const [cart, setCart] = React.useState<CartDto>();
    // const [countCartDetail, setCountCartDetail] = React.useState<number>(0);

    // React.useEffect(() => {
    //     fetchCart();
    //     setIsLogin(localStorage.getItem('isLogin'));
    //     setRole(localStorage.getItem('role'));
    // }, []);

    // const fetchCart = () => {
    //     axios
    //         .get(CART_INDEX_API, { params: { accountId: isLogin } })
    //         .then((res) => {
    //             if (res.data.success) {
    //                 setCart(res.data.result[0]);
    //                 setCountCartDetail(cart?.cartDetails?.length || 0);
    //             }
    //         })
    // };

    return (
        <>
            <Navbar />
            <div className='' id='scroll-to'></div>
            <Outlet />
            <>
                <div className='w-full bg-gray-200 py-8 flex justify-center'>
                    <Container>
                        <div className='flex items-center text-lg'>
                            <PhoneIcon />
                            <span className='mx-2'>Call us:</span>
                            <span className='text-red-500'>07989 12 333</span>
                        </div>
                    </Container>
                </div>
                <Footer />
                <div className='my-4 flex justify-center text-base'>
                    Copyright © 2022 Hasu Flora. Powered by Khoa Tran
                </div>
            </>

            <ScrollTop />
        </>
    );
};

export default LayoutPage;
