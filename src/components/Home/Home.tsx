import { Container } from "@mui/material";
import { FC } from "react";
import Products from "../Product/Products";
import Slider from "../Slider/Slider";
import Chatbot from "../Chat/Chatbot/Chatbot";

const Home: FC<{}> = () => {
    return (
        <Container className="mt-5">
            <Slider />
            <Products />
            {/* <Chatbot /> */}
        </Container>
    );
};

export default Home;
