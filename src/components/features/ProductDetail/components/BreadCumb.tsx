import React from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ProductDto } from '~/types/product/ProductDto';

interface Props {
    product: ProductDto | undefined;
}

export const BreadCumb: React.FC<Props> = (props) => {
    const { product } = props;

    return (
        <div className='mt-10'>
            <Breadcrumbs aria-label='breadcrumb'>
                <Link to='/'>Trang chủ</Link>
                <Link to='/'>{product?.category?.name}</Link>
                <Typography color='text.primary'>{product?.name}</Typography>
            </Breadcrumbs>
        </div>
    );
};