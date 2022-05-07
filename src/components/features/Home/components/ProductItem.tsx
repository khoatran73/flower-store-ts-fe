import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, Card, CardContent, CardMedia } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ProductDto } from '../../../../types/product/ProductDto';
interface Props {
    product: ProductDto;
    width: number;
    height: number;
    size?: 'small' | 'medium' | 'large' | undefined;
}

const ProductItem: FC<Props> = (props) => {
    const { product, width, height, size } = props;
    const { id, image, name, unitPrice } = product;

    const path: string = `/product/${id.toString()}`;

    return (
        <Link to={path}>
            <Card
                className='flex-initial my-1 place-content-stretch mx-[4px] cursor-pointer'
                style={{ width: width }}
            >
                <div className='overflow-hidden' style={{ height: height }}>
                    <CardMedia
                        className=' hover:scale-110'
                        style={{
                            transition: 'all 0.5s ease-in-out',
                            // transitionDelay: "0.1s",
                            width: width,
                            height: height,
                        }}
                        component='img'
                        image={image}
                        alt='Product'
                    />
                </div>
                <CardContent>
                    <h3 className='text-center text-xl font-semibold'>
                        {name}
                    </h3>
                    <div className='text-center mt-1 text-md text-red-500'>
                        Giá: {unitPrice}
                    </div>
                    <div className='mt-3 text-center'>
                        <Button
                            variant='outlined'
                            startIcon={<AddShoppingCartIcon />}
                            size={size}
                        >
                            Them vao gio hang
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default ProductItem;
