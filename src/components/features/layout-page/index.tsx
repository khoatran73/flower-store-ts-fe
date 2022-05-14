import PhoneIcon from '@mui/icons-material/Phone';
import { Container } from '@mui/material';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './../../shared/Footer/Footer';
import Navbar from './../../shared/Nav/Navbar';
import ScrollTop from './../../shared/ScrollTop/ScrollTop';

const LayoutPage: React.FC = () => {
    const { pathname } = useLocation();
    return (
        <>
            <Navbar />
            <div className='' id='scroll-to'></div>
            <Outlet />
            {!pathname.includes('profile') && !pathname.includes('dashboard') && (
                <>
                    <div className='w-full bg-gray-200 py-8 flex justify-center'>
                        <Container>
                            <div className='flex items-center text-lg'>
                                <PhoneIcon />
                                <span className='mx-2'>Call us:</span>
                                <span className='text-red-500'>
                                    07989 12 333
                                </span>
                            </div>
                        </Container>
                    </div>
                    <Footer />
                    <div className='py-4 flex justify-center text-base'>
                        Copyright © 2022 FlowerStore. Powered by Khoa Tran
                    </div>
                </>
            )}

            <ScrollTop />
        </>
    );
};

export default LayoutPage;
