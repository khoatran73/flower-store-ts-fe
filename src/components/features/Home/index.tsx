import { Container } from '@mui/material';
import { FC } from 'react';
import HomeProduct from './components/HomeProduct';
import Slider from './components/Slider';
import { Banner } from './components/Banner';

const Home: FC = () => {
    return (
        <div>
            <Slider />
            <Container className='mt-5'>
                <HomeProduct />
            </Container>
            <Banner />
        </div>
    );
};

export default Home;
