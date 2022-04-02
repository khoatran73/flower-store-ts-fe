import React from "react";
import ProductItem from "../Home/HomeProduct/ProductItem";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
}

const RelatedProducts: React.FC = () => {
    const products: Product[] = [
        {
            id: 1,
            name: "hoa 1",
            image: "https://hasuflora.com/resize/640x630/1/upload/baiviet/hophoatuoicaocapsaigon003-4403.png",
            price: 0,
        },
        {
            id: 2,
            name: "hoa 2",
            image: "https://hasuflora.com/resize/640x630/1/upload/baiviet/hophoatuoicaocapsaigon003-4403.png",
            price: 0,
        },
        {
            id: 3,
            name: "hoa 3",
            image: "https://hasuflora.com/resize/640x630/1/upload/baiviet/hophoatuoicaocapsaigon003-4403.png",
            price: 0,
        },
        {
            id: 4,
            name: "hoa 4",
            image: "https://hasuflora.com/resize/640x630/1/upload/baiviet/hophoatuoicaocapsaigon003-4403.png",
            price: 0,
        },
        {
            id: 5,
            name: "hoa 5",
            image: "https://hasuflora.com/resize/640x630/1/upload/baiviet/hophoatuoicaocapsaigon003-4403.png",
            price: 0,
        },
        {
            id: 6,
            name: "hoa 6",
            image: "https://hasuflora.com/resize/640x630/1/upload/baiviet/hophoatuoicaocapsaigon003-4403.png",
            price: 0,
        },
    ];
    return (
        <div className="my-10">
            <div className="flex items-center mb-5 justify-between">
                <div className="text-2xl font-semibold text-left uppercase">
                    San pham lien quan
                </div>
                <div className="flex items-center text-md text-blue-700 hover:cursor-pointer">
                    Xem them <ChevronRightIcon />
                </div>
            </div>
            <div className=" flex justify-start items-center flex-wrap">
                {products.map((product, index) =>
                    index < 5 ? (
                        <ProductItem
                            key={index}
                            id={product.id}
                            name={product.name}
                            image={product.image}
                            price={product.price}
                            width={222.4}
                            height={200}
                            size="small"
                        />
                    ) : (
                        <div key={index}></div>
                    )
                )}
            </div>
        </div>
    );
};

export default RelatedProducts;
