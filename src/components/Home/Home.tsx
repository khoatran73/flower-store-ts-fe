import { Container } from "@mui/material";
import { FC } from "react";
import HomeProduct from "./HomeProduct/HomeProduct";
import Slider from "./Slider/Slider";

const Home: FC<{}> = () => {
    return (
        <Container className="mt-5">
            <Slider />
            <HomeProduct />
        </Container>
    );
};

export default Home;
