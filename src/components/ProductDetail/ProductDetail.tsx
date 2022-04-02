import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import ProductInfo from "./ProductInfo";
import ProductComment from "./ProductComment";
import RelatedProducts from "./RelatedProducts";

const ProductDetail: React.FC<{}> = () => {
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
