import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardMedia,
    Container,
    Divider,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Modal,
    Paper,
    Toolbar,
    Typography,
} from '@mui/material';
import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CartDto } from '../../../types/cart/Cart';
import Cart from './components/Cart';
// import { isLogin } from '../../../constant';

const pages = ['Home', 'Products', 'Pricing', 'Blog'];
const routes = ['/', '/product', '/cart', '/purchase'];

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
};

const Navbar: React.FC = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );
    const [isLogin, setIsLogin] = React.useState<string | null>();
    const [role, setRole] = React.useState<string | null>();

    React.useEffect(() => {
        setIsLogin(localStorage.getItem('isLogin'));
        setRole(localStorage.getItem('role'));
    }, []);

    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = () => {
        localStorage.removeItem('isLogin');
        localStorage.removeItem('role');
        setIsLogin(null);
        setRole(null);
    };

    const carts: CartDto[] = [
        {
            name: 'hoa 1',
            unitPrice: 120000,
            totalQuantity: 2,
            totalPrice: 2400000,
        },
        {
            name: 'hoa 2',
            unitPrice: 130000,
            totalQuantity: 1,
            totalPrice: 2400000,
        },
        {
            name: 'hoa 3',
            unitPrice: 140000,
            totalQuantity: 1,
            totalPrice: 2400000,
        },
    ];

    return (
        <div
            className='max-h-[100px] overflow-hidden bg-white shadow-md w-full fixed z-50 top-0'
            id='navbar'
        >
            <Container>
                <Toolbar
                    disableGutters
                    className='flex h-[100%] align-center p-3 items-center justify-between '
                >
                    <Typography variant='h6' noWrap component='div'>
                        <Link to='/'>
                            <Card className=''>
                                <CardMedia
                                    component='img'
                                    height='60'
                                    image='https://res.cloudinary.com/dqrkqvtjg/image/upload/v1651974807/Flower-store/logo_otxw9r.webp'
                                />
                            </Card>
                        </Link>
                    </Typography>
                    <div className='flex justify-between items-center'>
                        <Box className='ml-6'>
                            {pages.map((page, index) => (
                                <NavLink
                                    key={index}
                                    to={routes && routes[index]}
                                    className='mr-2 ml-2 hover:text-red-400 transition ease-in-out delay-75 duration-1000'
                                >
                                    {page}
                                </NavLink>
                            ))}
                        </Box>
                    </div>
                    <div className='flex justify-between items-center'>
                        <Paper component='form' className='mr-2'>
                            <InputBase
                                className='ml-3 '
                                placeholder='Tìm kiếm sản phẩm'
                            />
                            <IconButton
                                sx={{ p: '10px' }}
                                aria-label='search'
                                onClick={(e) => e.preventDefault()}
                            >
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                        <Box className='w-[240px] flex justify-end items-center'>
                            {isLogin ? (
                                <>
                                    <Typography className='w-[100%] flex justify-end items-center'>
                                        {role === 'customer' && (
                                            <IconButton
                                                sx={{ p: '10px' }}
                                                aria-label='cart'
                                                onClick={handleOpenModal}
                                            >
                                                <ShoppingCartIcon />
                                            </IconButton>
                                        )}
                                        <Avatar
                                            className='ml-5'
                                            alt='Khoa Henry'
                                            onClick={handleOpenUserMenu}
                                        />

                                        <Button
                                            size='small'
                                            onClick={logout}
                                            variant='contained'
                                            sx={{ marginLeft: '10px' }}
                                        >
                                            Đăng xuất
                                        </Button>
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <Link to='/login'>
                                        <Button
                                            variant='contained'
                                            component='span'
                                            style={{ marginRight: '10px' }}
                                            size='small'
                                        >
                                            Đăng nhập
                                        </Button>
                                    </Link>
                                    <Link to='/register'>
                                        <Button
                                            variant='contained'
                                            component='span'
                                            size='small'
                                        >
                                            Đăng ký
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </Box>
                    </div>
                </Toolbar>
            </Container>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style} className='h-[400px] overflow-hidden'>
                    {/* <Typography
                        id="modal-modal-description bg-white"
                        sx={{ mt: 2 }}
                    >
                        Duis mollis, est non commodo luctus, nisi erat porttitor
                        ligula.
                    </Typography> */}
                    <div className='h-[350px] overflow-y-auto overflow-x-hidden'>
                        {carts.map((cart, index) => (
                            <>
                                <Cart key={index} cart={cart} />
                                <Divider />
                            </>
                        ))}
                    </div>
                    <Divider />
                    <div className='h-[50px] flex items-center justify-center'>
                        <Button variant='contained'>Thanh toan</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Navbar;
