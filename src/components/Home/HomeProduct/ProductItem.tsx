import { FC } from "react";
import { Button, Card, CardMedia, CardContent } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
interface Props {
    id: number;
    name: string;
    image: string;
    price: number;
    width: number;
    height: number;
    size?: "small" | undefined;
}

const ProductItem: FC<Props> = (props) => {
    const { id, image, name, price, width, height, size } = props;

    const path: string = `/product/${id.toString()}`;

    return (
        <Link to={path}>
            <Card
                className="flex-initial my-1 place-content-stretch mx-[4px] cursor-pointer"
                style={{ width: width }}
            >
                <div className="overflow-hidden" style={{ height: height }}>
                    <CardMedia
                        className=" hover:scale-110"
                        style={{
                            transition: "all 0.5s ease-in-out",
                            // transitionDelay: "0.1s",
                            width: width,
                            height: height,
                        }}
                        component="img"
                        image={image}
                        alt="Product"
                    />
                </div>
                <CardContent>
                    <h3 className="text-center text-xl font-semibold">
                        {name}
                    </h3>
                    <div className="text-center mt-1 text-md text-red-500">
                        Giá: {price}
                    </div>
                    <div className="mt-3 text-center">
                        <Button
                            variant="outlined"
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
