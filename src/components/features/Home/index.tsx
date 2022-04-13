import { Container } from "@mui/material";
import { FC } from "react";
import HomeProduct from "./components/HomeProduct";
import Slider from "./components/Slider";

const Home: FC = () => {
    return (
        <Container className="mt-5">
            <Slider />
            <HomeProduct />
        </Container>
    );
};

export default Home;
