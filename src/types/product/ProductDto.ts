export interface ProductDto {
    id: string;
    name: string;
    unitPrice: number;
    image: string;
    totalQuantity: number; // so luong
    description?: string;
    category: CategoryDto;
    categoryId: string;
}

export interface CategoryDto {
    id: string;
    name: string;
}
export interface ProductCreateDto {
    name: string;
    categoryId: string;
    unitPrice: number;
    totalQuantity?: number;
    description?: string;
    file?: File;
}

export interface ProductUpdateDto {
    id: string;
    name: string;
    categoryId: string;
    unitPrice: number;
    totalQuantity?: number;
    description?: string;
    file?: File;
    image: string;
}
