import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Divider } from "@mui/material";

const ProductDetail: React.FC<{}> = () => {
    const [count, setCount] = React.useState(1);

    return (
        <div className="my-10">
            <div className="flex justify-between items-start">
                <div>
                    <img
                        src="https://hasuflora.com/resize/640x630/1/upload/baiviet/binhhoatuoidep023-3110.png"
                        alt="Hoa"
                        className="max-w-[480px] "
                    />
                </div>
                <div className="ml-5">
                    <div className="text-3xl font-semibold uppercase pb-2">
                        Title
                    </div>
                    <Divider />
                    <div className="text-3xl text-red-800 py-2">Lien he</div>
                    <Divider />
                    <div>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Perferendis animi laboriosam doloribus reiciendis
                        magni pariatur, voluptates temporibus accusamus, itaque
                        repellat deserunt veniam nemo odit nisi expedita optio
                        nobis. Quae, et?
                    </div>
                </div>
            </div>
            <div className="flex mt-2">
                <div className="w-[480px]"></div>
                <div className="ml-5">
                    <div>
                        <div className="flex items-center">
                            <div className="mr-3">Số lượng</div>
                            <ButtonGroup>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setCount(Math.max(count - 1, 0));
                                    }}
                                >
                                    <RemoveIcon fontSize="small" />
                                </Button>
                                <Button className="mx-2" disabled>
                                    {count}
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setCount(count + 1);
                                    }}
                                >
                                    <AddIcon fontSize="small" />
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>
                    <div className="mt-3">
                        <Button
                            variant="contained"
                            startIcon={<AddShoppingCartIcon />}
                            color="success"
                        >
                            Thêm vào giỏ hàng
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
