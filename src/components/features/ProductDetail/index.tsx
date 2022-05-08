import { Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductDto } from '../../../types/product/ProductDto';
import { PRODUCT_DETAIL_API } from './api';
import { BreadCumb } from './components/BreadCumb';
import ProductComment from './components/ProductComment';
import ProductInfo from './components/ProductInfo';
import RelatedProducts from './components/RelatedProducts';
import Loading from '../../../components/utils/Loading';

const ProductDetail: React.FC = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductDto>();
    const [relatedProducts, setRelatedProducts] = useState<ProductDto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchProductDetail = async () => {
            setLoading(true);
            await axios
                .get(`${PRODUCT_DETAIL_API}/${id}`)
                .then((res) => {
                    setLoading(false);
                    if (res.data.success) setProduct(res.data.result);
                })
                .catch((err) => setLoading(false));
        };

        fetchProductDetail();

        const fetchRelatedProduct = async () => {
            const params = { id: id, categoryId: product?.categoryId };
            setLoading(true);
            await axios
                .get(PRODUCT_DETAIL_API, {
                    params: params,
                })
                .then((res) => {
                    setLoading(false);
                    if (res.data.success) setRelatedProducts(res.data.result);
                })
                .catch((err) => setLoading(false));
        };

        fetchRelatedProduct();
    }, [id, product?.categoryId]);

    if (loading) return <Loading loading={loading} />;
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
