import { Container, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CategoryDto, ProductDto } from 'src/types/product/ProductDto';
import ProductItem from '../Home/components/ProductItem';
import axios from 'axios';
import { PRODUCT_DETAIL_API } from '../ProductDetail/api';
import { CATEGORY_INDEX_API } from '../Dashboard/api';

const Product: React.FC = () => {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [categories, setCategories] = useState<CategoryDto[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            await axios
                .get(PRODUCT_DETAIL_API)
                .then((res) => {
                    if (res.data.success) setProducts(res.data.result);
                })
                .catch((err) => console.log(err));
        };

        fetchProducts();

        const getCategories = async () => {
            await axios
                .get(CATEGORY_INDEX_API)
                .then((res) => {
                    if (res.data.success) {
                        const result = res.data.result as CategoryDto[];
                        setCategories(result);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        getCategories();
    }, []);

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
                    {products.map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            width={268}
                            height={220}
                        />
                    ))}
                </div>
                <div className='mt-4 flex justify-center'>
                    <Pagination count={3} color='primary' />
                </div>
            </div>
        </Container>
    );
};

export default Product;
