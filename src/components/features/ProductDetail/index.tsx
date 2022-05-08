import { Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductDto } from 'src/types/product/ProductDto';
import { PRODUCT_DETAIL_API } from './api';
import { BreadCumb } from './components/BreadCumb';
import ProductComment from './components/ProductComment';
import ProductInfo from './components/ProductInfo';
import RelatedProducts from './components/RelatedProducts';

const ProductDetail: React.FC = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductDto>();
    const [relatedProducts, setRelatedProducts] = useState<ProductDto[]>([]);

    useEffect(() => {
        const fetchProductDetail = async () => {
            await axios
                .get(`${PRODUCT_DETAIL_API}/${id}`)
                .then((res) => {
                    if (res.data.success) setProduct(res.data.result);
                })
                .catch((err) => console.log(err));
        };

        fetchProductDetail();

        const fetchRelatedProduct = async () => {
            const params = { id: id, categoryId: product?.categoryId };
            console.log(params);
            await axios
                .get(PRODUCT_DETAIL_API, {
                    params: params,
                })
                .then((res) => {
                    if (res.data.success) setRelatedProducts(res.data.result);
                })
                .catch((err) => console.log(err));
        };

        fetchRelatedProduct();
    }, [id]);

    return (
        <Container>
            <BreadCumb product={product} />
            <ProductInfo product={product} />
            <ProductComment />
            <RelatedProducts relatedProducts={relatedProducts} />
        </Container>
    );
};

export default ProductDetail;
