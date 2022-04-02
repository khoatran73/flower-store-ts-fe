import { FC } from "react";
import ProductList from "./ProductList";
import { Pagination } from "@mui/material";

interface Product {
    name: string;
    image: string;
    price: number;
}

const Products: FC<{}> = () => {
    const products: Product[] = [
        {
            name: "hoa 1",
            image: "https://hasuflora.com/resize/640x630/1/upload/baiviet/hophoatuoicaocapsaigon003-4403.png",
            price: 0,
        },
        {
            name: "hoa 2",
            image: "https://hasuflora.com/resize/640x630/1/upload/baiviet/hophoatuoicaocapsaigon003-4403.png",
            price: 0,
        },
        {
            name: "hoa 3",
            image: "https://hasuflora.com/resize/640x630/1/upload/baiviet/hophoatuoicaocapsaigon003-4403.png",
            price: 0,
        },
        {
            name: "hoa 4",
            image: "https://hasuflora.com/resize/640x630/1/upload/baiviet/hophoatuoicaocapsaigon003-4403.png",
            price: 0,
        },
        {
            name: "hoa 5",
            image: "https://hasuflora.com/resize/640x630/1/upload/baiviet/hophoatuoicaocapsaigon003-4403.png",
            price: 0,
        },
        {
            name: "hoa 6",
            image: "https://hasuflora.com/resize/640x630/1/upload/baiviet/hophoatuoicaocapsaigon003-4403.png",
            price: 0,
        },
    ];

    return (
        <div className="my-10">
            <div className="text-3xl font-semibold mb-5 text-center uppercase">
                Danh sach san pham
            </div>
            <div className=" flex justify-start items-center flex-wrap">
                {products.map((product, index) => (
                    <ProductList
                        key={index}
                        name={product.name}
                        image={product.image}
                        price={product.price}
                        width={280}
                        height={240}
                    />
                ))}
            </div>
            <div className="mt-4 flex justify-center">
                <Pagination count={3} color="primary" />
            </div>
        </div>
    );
};

export default Products;
