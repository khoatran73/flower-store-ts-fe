import axios from 'axios';
import { FC, useState, useEffect } from 'react';
import { ProductDto } from '../../../../types/product/ProductDto';
import { PRODUCT_INDEX_API } from '../../Dashboard/api';
import ProductItem from './ProductItem';

const HomeProduct: FC = () => {
    const [products, setProducts] = useState<ProductDto[]>([]);

    useEffect(() => {
        const fetchProducts = () => {
            axios.get(PRODUCT_INDEX_API).then((res) => {
                const data = res.data;
                if (data.success) {
                    setProducts(data.result);
                }
            });
        };

        fetchProducts();
    });

    return (
        <div className='my-10'>
            <div className='text-3xl font-semibold mb-5 text-center uppercase'>
                Danh sach san pham
            </div>
            <div className=' flex justify-start items-center flex-wrap'>
                {products.map((product) => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        width={280}
                        height={240}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeProduct;
