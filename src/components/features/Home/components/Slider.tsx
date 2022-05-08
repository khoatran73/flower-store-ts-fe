import { FC } from 'react';
import Carousel from 'react-material-ui-carousel';

interface ISlider {
    id: number;
    url: string;
    alt: string;
}

interface CarouselSetting {
    autoPlay: boolean;
    animation: 'fade' | 'slide';
    indicators: boolean;
    duration: number;
    navButtonsAlwaysVisible: boolean;
    navButtonsAlwaysInvisible: boolean;
    fullHeightHover: boolean;
    cycleNavigation: boolean;
    stopAutoPlayOnHover: boolean;
    swipe: boolean;
    [key: string]: any;
}

const Slider: FC = () => {
    const items: ISlider[] = [
        {
            id: 1,
            url: 'https://res.cloudinary.com/dqrkqvtjg/image/upload/v1651975262/Flower-store/t%E1%BA%A3i_xu%E1%BB%91ng_3_ytcanm.png',
            alt: 'Slider',
        },
        {
            id: 2,
            url: 'https://res.cloudinary.com/dqrkqvtjg/image/upload/v1651975262/Flower-store/t%E1%BA%A3i_xu%E1%BB%91ng_2_wlu5no.png',
            alt: 'Slider',
        },
        {
            id: 3,
            url: 'https://res.cloudinary.com/dqrkqvtjg/image/upload/v1651975262/Flower-store/logo_j7etei.webp',
            alt: 'Slider',
        },
    ];

    const settings: CarouselSetting = {
        autoPlay: true,
        animation: 'slide',
        indicators: true,
        duration: 300,
        navButtonsAlwaysVisible: false,
        navButtonsAlwaysInvisible: false,
        cycleNavigation: true,
        fullHeightHover: true,
        stopAutoPlayOnHover: true,
        swipe: true,
    };

    return (
        <Carousel {...settings}>
            {items.map((item) => (
                <img key={item.id} alt={item.alt} src={item.url}></img>
            ))}
        </Carousel>
    );
};

export default Slider;
