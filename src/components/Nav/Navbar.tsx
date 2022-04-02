import * as React from "react";
import { NavLink, Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {
    Toolbar,
    Paper,
    Card,
    CardMedia,
    Button,
    InputBase,
    MenuItem,
    Avatar,
    Container,
    Menu,
    Typography,
    IconButton,
    Box,
    Alert,
    AlertTitle,
    Collapse,
} from "@mui/material";

const pages = ["Home", "Products", "Pricing", "Blog"];
const routes = ["/", "/product", "/cart", "/purchase"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const imageUrl =
    "https://scontent.fhan3-5.fna.fbcdn.net/v/t39.30808-1/274500305_3163920960531216_3441052918446606780_n.jpg?stp=dst-jpg_s320x320&_nc_cat=109&ccb=1-5&_nc_sid=7206a8&_nc_ohc=ak7-TsSQGcIAX-nyrzX&_nc_ht=scontent.fhan3-5.fna&oh=00_AT_nGtQaOH9RNoCCpvxc6M2MZY7o2Sd7Re-hRjEYHTe3sA&oe=624C7DC9";

interface IOpen {
    open: boolean;
}

const Navbar: React.FC<{}> = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );
    const [isLogin, setIsLogin] = React.useState<boolean>(false);
    const [openAlert, setOpenAlert] = React.useState<IOpen>({ open: false });

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    React.useEffect(() => {
        const timeOut = setTimeout(() => {
            setOpenAlert({ open: false });
        }, 3000);

        return () => clearTimeout(timeOut);
    }, [openAlert]);

    return (
        <div className="max-h-[80px] overflow-hidden bg-gray-300" id="navbar">
            <Container>
                <Toolbar
                    disableGutters
                    className="flex h-[100%] align-center p-3 items-center justify-between "
                >
                    <div className="flex justify-between items-center">
                        <Typography variant="h6" noWrap component="div">
                            <Link to="/">
                                <Card className="w-[60px]">
                                    <CardMedia
                                        component="img"
                                        height="60"
                                        image={imageUrl}
                                    />
                                </Card>
                            </Link>
                        </Typography>
                        <Box className="ml-6">
                            {pages.map((page, index) => (
                                <NavLink
                                    key={index}
                                    to={routes && routes[index]}
                                    className="mr-2 ml-2 hover:text-red-400 transition ease-in-out delay-75 duration-1000"
                                >
                                    {page}
                                </NavLink>
                            ))}
                        </Box>
                    </div>
                    <div className="flex justify-between items-center">
                        <Paper component="form" className="mr-2">
                            <InputBase
                                className="ml-3 "
                                placeholder="Tìm kiếm sản phẩm"
                            />
                            <IconButton
                                type="submit"
                                sx={{ p: "10px" }}
                                aria-label="search"
                                onClick={(e) => e.preventDefault()}
                            >
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                        <Box className="w-[240px] flex justify-end items-center">
                            {isLogin ? (
                                <>
                                    <Typography
                                        onClick={handleOpenUserMenu}
                                        className="w-[80px] text-center hover:bg-inherit cursor-pointer"
                                    >
                                        <Avatar
                                            className="mx-auto my-0"
                                            alt="Khoa Henry"
                                            src={imageUrl}
                                        />
                                    </Typography>
                                    <Collapse
                                        in={openAlert.open}
                                        className="z-10"
                                        id="alert success"
                                    >
                                        <Alert
                                            style={{
                                                position: "fixed",
                                                bottom: "30px",
                                                right: "30px",
                                            }}
                                            severity="success"
                                            color="info"
                                            onClose={() =>
                                                setOpenAlert({ open: false })
                                            }
                                        >
                                            <AlertTitle>Success</AlertTitle>
                                            This is a success alert — check it
                                            out!
                                        </Alert>
                                    </Collapse>
                                </>
                            ) : (
                                <>
                                    <Button
                                        onClick={() => {
                                            setIsLogin(!isLogin);
                                            setOpenAlert({ open: true });
                                        }}
                                        variant="contained"
                                        component="span"
                                        style={{ marginRight: "10px" }}
                                    >
                                        Đăng nhập
                                    </Button>
                                    <Button
                                        variant="contained"
                                        component="span"
                                    >
                                        Đăng ký
                                    </Button>
                                </>
                            )}

                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting, index) => (
                                    <MenuItem
                                        key={index}
                                        onClick={handleCloseUserMenu}
                                    >
                                        {setting === "Logout" ? (
                                            <Typography
                                                textAlign="center"
                                                onClick={() =>
                                                    setIsLogin(!isLogin)
                                                }
                                            >
                                                {setting}
                                            </Typography>
                                        ) : (
                                            <Typography textAlign="center">
                                                {setting}
                                            </Typography>
                                        )}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </div>
                </Toolbar>
            </Container>
        </div>
    );
};

export default Navbar;
