import { ProductDto } from '../product/ProductDto';

export interface HistoryDto {
    id: string;
    customerId: string;
    cartId: string;
    discount: number;
    tax: number;
    totalPrice: number;
    deliveryAt: Date;
    createdAt: Date;
    cart: HistoryCart;
}

export interface HistoryCart {
    cartDetails: HistoryCartDetail[];
}

export interface HistoryCartDetail {
    quantity: number;
    price: number;
    product: ProductDto;
}

// export interface HistoryProduct {
//     name: string;
// }
