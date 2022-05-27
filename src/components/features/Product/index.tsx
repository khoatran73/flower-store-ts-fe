import { Container, IconButton, Pagination, TextField } from '@mui/material';
import { Tabs } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CategoryDto, ProductDto } from '../../../types/product/ProductDto';
import { CATEGORY_INDEX_API, LIST_CATEGORY_API } from '../Dashboard/api';
import ProductItem from '../Home/components/ProductItem';
import { usePagination } from './config/usePagination';
import SearchIcon from '@mui/icons-material/Search';

const { TabPane } = Tabs;

const Product: React.FC = () => {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryCode = searchParams?.get('code')?.toString() || '';
    const searchKey = searchParams?.get('searchKey')?.toString() || '';
    const [activeTab, setActiveTab] = useState<string>(categoryCode);

    const [page, setPage] = useState<number>(1);
    const PER_PAGE = 12;

    const count = Math.ceil(products.length / PER_PAGE);
    const _DATA = usePagination(products, PER_PAGE);

    const handleChange = (e: React.ChangeEvent<unknown>, p: number) => {
        setPage(p);
        _DATA.jump(p);
    };

    const fetchProducts = async (
        categoryCode: string | undefined,
        searchKey: string | undefined
    ) => {
        const params = { categoryCode: categoryCode, searchKey: searchKey };
        setLoading(true);
        await axios
            .get(LIST_CATEGORY_API, { params })
            .then((res) => {
                setLoading(false);
                if (res.data.success) setProducts(res.data.result);
            })
            .catch((err) => setLoading(false));
    };

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

    useEffect(() => {
        getCategories();
        fetchProducts(categoryCode, searchKey);
        setActiveTab(categoryCode);
    }, [categoryCode, searchKey]);

    const onTabChange = (key: string) => {
        setActiveTab(key);
        searchParams.set('code', key);
        setSearchParams(searchParams);
        fetchProducts(key, searchKey);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const searchKey = data.get('searchKey')?.toString();
        searchParams.set('searchKey', searchKey || '');
        setSearchParams(searchParams);

        fetchProducts(categoryCode, searchKey);
    };

    // if (loading) return <Loading loading={loading} />;
    return (
        <Container>
            <div className='my-10'>
                <div className=' mb-5 text-center '>
                    <div className='text-3xl font-semibold uppercase'>
                        Danh sách sản phẩm
                    </div>
                    <div className='my-5'>
                        <form
                            onSubmit={onSubmit}
                            className='flex items-center justify-center'
                        >
                            <TextField
                                name='searchKey'
                                label='Tìm kiếm sản phẩm...'
                                size='small'
                                sx={{ width: '50%' }}
                                color='primary'
                            />
                            <IconButton
                                color='primary'
                                sx={{ p: '10px', marginLeft: '6px' }}
                                aria-label='directions'
                                type='submit'
                            >
                                <SearchIcon />
                            </IconButton>
                        </form>
                    </div>
                </div>

                <div className='flex'>
                    <Tabs
                        defaultActiveKey={activeTab}
                        activeKey={activeTab}
                        size='large'
                        onChange={onTabChange}
                        // type='card'
                    >
                        <TabPane tab={'Tất cả sản phẩm'} key={''}>
                            {/* Tất cả sản phẩm */}
                        </TabPane>
                        {categories.map((category) => (
                            <TabPane tab={category.name} key={category.code}>
                                {/* {category.name} */}
                            </TabPane>
                        ))}
                    </Tabs>
                </div>
                <div className='my-2 text-lg'>
                    Tìm thấy{' '}
                    <span className='text-red-500'>{products.length}</span> sản
                    phẩm
                    {searchKey.length > 0 && (
                        <>
                            {' '}
                            chứa{' '}
                            <span className='text-red-500'>
                                {searchKey}
                            </span>{' '}
                            trong tên
                        </>
                    )}
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
                <div className='mt-4 flex justify-center pagination'>
                    {_DATA.currentData().length > 0 ? (
                        <Pagination
                            color='primary'
                            count={count}
                            page={page}
                            onChange={handleChange}
                        />
                    ) : (
                        <div className='text-base'>
                            Chưa có sản phẩm cho mục này
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default Product;
