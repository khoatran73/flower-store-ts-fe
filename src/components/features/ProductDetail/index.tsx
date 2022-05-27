import { Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/utils/Loading';
import { CategoryDto, ProductDto } from '../../../types/product/ProductDto';
import { LIST_RELATED_API } from '../Dashboard/api';
import { PRODUCT_DETAIL_API } from './api';
import { BreadCumb } from './components/BreadCumb';
import ProductComment from './components/ProductComment';
import ProductInfo from './components/ProductInfo';
import RelatedProducts from './components/RelatedProducts';

const ProductDetail: React.FC = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductDto>({} as ProductDto);
    const [relatedProducts, setRelatedProducts] = useState<ProductDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchProductDetail = async () => {
        setLoading(true);
        await axios
            .get(`${PRODUCT_DETAIL_API}/${id}`)
            .then((res) => {
                if (res.data.success) setProduct(res.data.result);
            })
            .catch((err) => {})
            .finally(() => setLoading(false));
    };

    const fetchRelatedProduct = async () => {
        const params = { id: id, categoryCode: product.category?.code };
        setLoading(true);
        await axios
            .get(LIST_RELATED_API, {
                params: params,
            })
            .then((res) => {
                setLoading(false);
                if (res.data.success) setRelatedProducts(res.data.result);
            })
            .catch((err) => {})
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchProductDetail();
        fetchRelatedProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, product.category?.code]);

    if (loading) return <Loading loading={loading} />;
    return (
        <Container>
            <BreadCumb product={product} />
            <ProductInfo product={product} />
            <ProductComment productId={id} />
            <RelatedProducts
                category={product?.category || ({} as CategoryDto)}
                relatedProducts={relatedProducts}
            />
        </Container>
    );
};

export default ProductDetail;
