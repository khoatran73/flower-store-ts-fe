import { FC } from "react";
import { Button, Card, CardMedia, CardContent } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

interface Props {
    name: string;
    image: string;
    price: number;
}

const ProductList: FC<Props> = (props) => {
    const { image, name, price } = props;

    return (
        <Card className="flex-initial my-1 place-content-stretch w-[280px] mx-[4px] cursor-pointer">
            <div className="overflow-hidden h-[240px]">
                <CardMedia
                    className="h-[240px] w-[280px] hover:scale-110"
                    style={{
                        transition: "all 0.5s ease-in-out",
                        transitionDelay: "0.1s",
                    }}
                    component="img"
                    image={image}
                    alt="Product"
                />
            </div>
            <CardContent>
                <h3 className="text-center text-xl font-semibold">{name}</h3>
                <div className="text-center mt-1 text-md text-red-500">
                    Giá: {price}
                </div>
                <div className="mt-3 text-center">
                    <Button
                        variant="outlined"
                        startIcon={<AddShoppingCartIcon />}
                    >
                        Them vao gio hang
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductList;
