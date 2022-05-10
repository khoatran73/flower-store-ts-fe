import { Container, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CategoryDto, ProductDto } from '../../../types/product/ProductDto';
import ProductItem from '../Home/components/ProductItem';
import axios from 'axios';
import { PRODUCT_DETAIL_API } from '../ProductDetail/api';
import { CATEGORY_INDEX_API } from '../Dashboard/api';
import Loading from '../../../components/utils/Loading';
import { usePagination } from './config/usePagination';

const Product: React.FC = () => {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [page, setPage] = useState<number>(1);
    const PER_PAGE = 8;

    const count = Math.ceil(products.length / PER_PAGE);
    const _DATA = usePagination(products, PER_PAGE);

    const handleChange = (e: React.ChangeEvent<unknown>, p: number) => {
        setPage(p);
        _DATA.jump(p);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            await axios
                .get(PRODUCT_DETAIL_API)
                .then((res) => {
                    setLoading(false);
                    if (res.data.success) setProducts(res.data.result);
                })
                .catch((err) => setLoading(false));
        };

        fetchProducts();

        const getCategories = async () => {
            setLoading(true);
            await axios
                .get(CATEGORY_INDEX_API)
                .then((res) => {
                    if (res.data.success) {
                        setLoading(false);
                        const result = res.data.result as CategoryDto[];
                        setCategories(result);
                    }
                })
                .catch((err) => {
                    setLoading(false);
                });
        };

        getCategories();
    }, []);

    if (loading) return <Loading loading={loading} />;
    return (
        <Container>
            <div className='my-10'>
                <div className='text-3xl font-semibold mb-5 text-center uppercase'>
                    Danh sách sản phẩm
                </div>
                <div className='flex mb-5'>
                    {categories.map((category) => (
                        <div className='mr-5 uppercase text-lg'>
                            {category.name}
                        </div>
                    ))}
                </div>
                <div className=' flex justify-start items-center flex-wrap'>
                    {_DATA.currentData().map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            width={268}
                            height={220}
                        />
                    ))}
                </div>
                <div className='mt-4 flex justify-center'>
                    <Pagination
                        color='primary'
                        count={count}
                        page={page}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </Container>
    );
};

export default Product;
