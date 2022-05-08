import { Outlet } from 'react-router-dom';
import Footer from './../../shared/Footer/Footer';
import Navbar from './../../shared/Nav/Navbar';
import ScrollTop from './../../shared/ScrollTop/ScrollTop';
import PhoneIcon from '@mui/icons-material/Phone';
import { Container } from '@mui/material';

const LayoutPage: React.FC = () => {
    const path = window.location.pathname;

    return (
        <>
            {!path.includes('/dashboard') && <Navbar />}
            <div className='mt-24'></div>
            <Outlet />
            {!path.includes('/dashboard') && (
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
                    <div className='my-4 flex justify-center text-base'>
                        Copyright © 2022 Hasu Flora. Powered by Khoa Tran
                    </div>
                </>
            )}
            <ScrollTop />
        </>
    );
};

export default LayoutPage;
