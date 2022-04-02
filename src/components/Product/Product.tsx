import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import ProductDetail from "./ProductDetail";
import ProductComment from "./ProductComment";
import RelatedProducts from "./RelatedProducts";

const Product: React.FC<{}> = () => {
    const { id } = useParams();
    console.log(id);

    return (
        <Container>
            <ProductDetail />
            <ProductComment />
            <RelatedProducts />
        </Container>
    );
};

export default Product;
