import SearchIcon from "@mui/icons-material/Search";
import {
    Alert,
    AlertTitle,
    Avatar,
    Box,
    Button,
    Card,
    CardMedia,
    Collapse,
    Container,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Paper,
    Toolbar,
    Typography,
} from "@mui/material";
import * as React from "react";
import { Link, NavLink } from "react-router-dom";

const pages = ["Home", "Products", "Pricing", "Blog"];
const routes = ["/", "/product", "/cart", "/purchase"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const imageUrl =
    "https://avatars.githubusercontent.com/u/77377243?s=400&u=f1135698dedef3ad6fbb056b8f9e4bed4c1a92e0&v=4";

interface IOpen {
    open: boolean;
}

const Navbar: React.FC = () => {
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
