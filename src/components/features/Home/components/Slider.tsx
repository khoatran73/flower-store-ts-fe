import { FC } from "react";
import Carousel from "react-material-ui-carousel";

interface ISlider {
    id: number;
    url: string;
    alt: string;
}

interface CarouselSetting {
    autoPlay: boolean;
    animation: "fade" | "slide";
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
            url: "https://dc.flowercorner.vn/uploads/P620b411321ca81.64685312_1.jpg",
            alt: "Slider",
        },
        {
            id: 2,
            url: "https://dc.flowercorner.vn/uploads/P620dd604b502e5.09606159_dat-hoa-online-giam-den-25.jpg",
            alt: "Slider",
        },
        {
            id: 3,
            url: "https://dc.flowercorner.vn/uploads/P620dd64fbbc6e3.58140733_dat-hoa-online-giao-mien-phi.jpg",
            alt: "Slider",
        },
    ];

    const settings: CarouselSetting = {
        autoPlay: true,
        animation: "slide",
        indicators: true,
        duration: 500,
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
