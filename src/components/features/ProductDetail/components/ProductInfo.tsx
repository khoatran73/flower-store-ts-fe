import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import axios from 'axios';
import React, { useState } from 'react';
import { ProductDto } from '../../../../types/product/ProductDto';
import { CREATE_CART_DETAIL_API } from '../api';

interface Props {
    product: ProductDto | undefined;
}

const ProductInfo: React.FC<Props> = (props: Props) => {
    const { product } = props;
    const [count, setCount] = React.useState(1);
    const [loading, setLoading] = useState<boolean>(false);
    const isLogin = localStorage.getItem('isLogin');
    // const role = localStorage.getItem('role');

    const onAddCart = () => {
        const params = {
            cartCreateDto: {
                accountId: isLogin,
                // account: {
                //     accountId: isLogin,
                //     role: role,
                // },
            },
            cartDetailCreateDto: {
                productId: product?.id,
                quantity: count,
                price: (product?.unitPrice as number) * count,
            },
        };

        setLoading(true);

        axios
            .post(CREATE_CART_DETAIL_API, params)
            .then((res) => {
                if (res.data.success) {
                    setLoading(false);
                } else {
                }
            })
            .catch((err) => setLoading(false));
    };

    // if (loading) return <Loading loading={loading} />;
    return (
        <div className='my-10'>
            <div className='flex justify-between items-start'>
                <div className='w-3/5'>
                    <img src={product?.image} alt='' className='' />
                </div>
                <div className='ml-5 w-2/5'>
                    <div className='text-xl font-semibold uppercase pb-2 border-b border-gray-200'>
                        {product?.name}
                    </div>
                    <div className='flex'>
                        <div>
                            Đã bán:{' '}
                            <span className='text-red-400 font-semibold'>
                                {product?.countSold}
                            </span>
                        </div>
                        <div className='ml-2'>
                            Kho:{' '}
                            <span className='text-red-400 font-semibold'>
                                {product?.totalQuantity}
                            </span>
                        </div>
                    </div>
                    <div className='text-lg font-semibold text-red-400 py-2 border-b border-gray-200'>
                        {product?.unitPrice?.toLocaleString()}₫
                    </div>
                    <div className='py-2'>
                        <div className='font-semibold'>Mô tả:</div>
                        <div className='ml-3 font-extralight mt-2'>
                            <div className='my-2'>- Chi tiết thiết kế:</div>
                            <div>{product?.description}</div>
                            <div className='my-2'>
                                - Hình ảnh thiết kế hoa chỉ mang tính chất tham
                                khảo. Tùy vào mùa hoa mà một số loại hoa lá
                                trong thiết kế sẽ không có hoặc chất lượng không
                                đảm bảo để thực hiện đơn hàng. Chúng tôi sẽ dùng
                                các loại hoa lá khác thay thế. Hình dáng và màu
                                sắc của hoa thay thế sẽ không làm thay đổi thiết
                                kế hoa, hay tính thẩm mĩ của sản phẩm. Quý khách
                                vui lòng liên hệ với chúng tôi qua số hotline
                                trước khi đặt hàng online để được tư vấn kĩ hơn
                                về các loại hoa hiện có trong mùa.
                            </div>
                            <div className='my-2'>
                                - Giá không áp dụng cho các ngày Tết và lễ lớn.
                            </div>
                            <div className='my-2 font-medium'>
                                FlowerStore xin chân thành cảm ơn sự ủng hộ của
                                Quý Khách.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex mt-6'>
                <div className='w-3/5'></div>
                <div className='ml-5 w-2/5'>
                    <div>
                        <div className='flex items-center'>
                            <ButtonGroup>
                                <Button
                                    variant='outlined'
                                    onClick={() => {
                                        setCount(Math.max(count - 1, 1));
                                    }}
                                    size='small'
                                >
                                    <RemoveIcon fontSize='small' />
                                </Button>
                                <Button className='mx-2' disabled>
                                    {count}
                                </Button>
                                <Button
                                    variant='outlined'
                                    onClick={() => {
                                        setCount(count + 1);
                                    }}
                                    size='small'
                                >
                                    <AddIcon fontSize='small' />
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <button
                            className='custom-button w-full text-md uppercase font-semibold'
                            style={{
                                paddingTop: '10px',
                                paddingBottom: '10px',
                            }}
                            onClick={onAddCart}
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
