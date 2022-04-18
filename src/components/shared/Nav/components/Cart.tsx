import React from 'react';
import { CartDto } from '../../../../types/cart/Cart';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
interface Props {
    cart: CartDto;
}

const Cart: React.FC<Props> = (props: Props) => {
    const { cart } = props;
    return (
        <div className='flex justify-between align-center p-3 hover:bg-gray-200 cursor-pointer'>
            <div className='flex align-center flex-auto w-3/4'>
                <img
                    src='https://avatars.githubusercontent.com/u/77377243?s=400&u=f1135698dedef3ad6fbb056b8f9e4bed4c1a92e0&v=4'
                    alt=''
                    className='w-12'
                />
                <div className='ml-2'>
                    <div className='font-semibold'>{cart.name}</div>
                    <div className='font-semibold text-gray-600'>
                        {cart.unitPrice}
                    </div>
                </div>
            </div>
            <div className='flex justify-between align-center flex-1'>
                <div>
                    <div>{cart.totalQuantity}</div>
                    <div className='font-semibold'>{cart.totalPrice}</div>
                </div>
                <IconButton
                    sx={{ width: 48, height: 48, marginLeft: 1 }}
                    aria-label='delete'
                >
                    <DeleteIcon color='error' />
                </IconButton>
            </div>
        </div>
    );
};

export default Cart;
