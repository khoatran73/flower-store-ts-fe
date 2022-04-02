import { Container } from "@mui/material";
import { FC } from "react";
import Products from "./Product/Products";
import Slider from "./Slider/Slider";

const Home: FC<{}> = () => {
    return (
        <Container className="mt-5">
            <Slider />
            <Products />
        </Container>
    );
};

export default Home;
