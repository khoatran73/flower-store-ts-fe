import { SimpleAccount } from '../auth/LoginDto';
import { ProductDto } from '../product/ProductDto';

export interface CartDto {
    id?: string;
    accountId?: string;
    totalPrice?: number;
    cartDetails?: CartDetailDto[];
    // public Guid Id { get; set; }
    // public Guid? AccountId { get; set; }
    // public int? TotalQuantity { get; set; }
    // public int? TotalPrice { get; set; }
}

export interface CartCreateDto {
    account?: SimpleAccount;
    accountId?: string;
    totalQuantity?: number;
    totalPrice?: number;
}

export interface CartDetailDto {
    cartId: string;
    productId: string;
    quantity?: number;
    price?: number;
    total?: number;
    cart?: CartDto;
    product?: ProductDto;
}
