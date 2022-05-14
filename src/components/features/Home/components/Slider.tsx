import { FC } from 'react';
// import Carousel from 'react-material-ui-carousel';
import { Carousel } from 'antd';

interface ISlider {
    id: number;
    url: string;
    alt: string;
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

    return (
        <Carousel dotPosition='bottom' autoplay effect='fade'>
            {items.map((item) => (
                <img key={item.id} alt={item.alt} src={item.url}></img>
            ))}
        </Carousel>
    );
};

export default Slider;
