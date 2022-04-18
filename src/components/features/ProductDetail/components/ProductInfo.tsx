import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React from "react";

const ProductInfo: React.FC = () => {
    const [count, setCount] = React.useState(1);

    return (
        <div className="my-10">
            <div className="flex justify-between items-start">
                <div>
                    <img
                        src="https://d1kwj86ddez2oj.cloudfront.net/14052020/c6Bg8DmWut8COQbz88b2PB9Yd4Rb3QLMXCPg2gah.jpg"
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
                    <div className="text-xl text-red-800 py-2">200.000</div>
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

export default ProductInfo;
