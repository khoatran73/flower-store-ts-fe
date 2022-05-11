import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React from 'react';
import { Link } from 'react-router-dom';
import { ProductDto } from 'src/types/product/ProductDto';
import ProductItem from '../../Home/components/ProductItem';

interface Props {
    relatedProducts: ProductDto[];
}

const RelatedProducts: React.FC<Props> = (props) => {
    const { relatedProducts } = props;
    return (
        <div className='my-10'>
            <div className='flex items-center mb-5 justify-between'>
                <div className='text-2xl font-semibold text-left uppercase'>
                    Sản phẩm liên quan
                </div>
                <Link to='/product'>
                    <div className='flex items-center text-md text-blue-600 hover:cursor-pointer'>
                        Xem thêm <ChevronRightIcon fontSize='small' />
                    </div>
                </Link>
            </div>
            <div className=' flex justify-start items-center flex-wrap'>
                {relatedProducts.map((product) => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        width={210}
                        height={180}
                        size='small'
                    />
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
