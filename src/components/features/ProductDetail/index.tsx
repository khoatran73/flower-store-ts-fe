import { Container } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import ProductComment from "./components/ProductComment";
import ProductInfo from "./components/ProductInfo";
import RelatedProducts from "./components/RelatedProducts";

const ProductDetail: React.FC = () => {
    const { id } = useParams();
    console.log(id);

    return (
        <Container>
            <ProductInfo />
            <ProductComment />
            <RelatedProducts />
        </Container>
    );
};

export default ProductDetail;
