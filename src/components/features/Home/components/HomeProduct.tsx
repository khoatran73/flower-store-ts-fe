import axios from 'axios';
import { FC, useState, useEffect } from 'react';
import { ProductDto } from '../../../../types/product/ProductDto';
import { PRODUCT_INDEX_API } from '../../Dashboard/api';
import ProductItem from './ProductItem';
import Loading from '../../../../components/utils/Loading';

const HomeProduct: FC = () => {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchProducts = () => {
            setLoading(true);
            axios
                .get(PRODUCT_INDEX_API)
                .then((res) => {
                    const data = res.data;
                    if (data.success) {
                        setLoading(false);
                        setProducts(data.result);
                    }
                })
                .catch(() => setLoading(false));
        };

        fetchProducts();
    }, []);

    // if (loading) return <Loading loading={loading} />;
    return (
        <div className='my-10'>
            <div className='text-2xl font-semibold mb-5 text-center uppercase'>
                sản phẩm nổi bật
            </div>
            <div className='flex justify-start items-center flex-wrap'>
                {products.map(
                    (product, index) =>
                        index < 12 && (
                            <ProductItem
                                key={product.id}
                                product={product}
                                width={268}
                                height={220}
                            />
                        )
                )}
            </div>
        </div>
    );
};

export default HomeProduct;
