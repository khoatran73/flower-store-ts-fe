export interface ProductDto {
    id: string;
    name: string;
    unitPrice: number;
    image: string;
    expiry: number; //ngay het han
    description?: string;
}

export interface ProductCreateDto {
    name: string;
    unitPrice: number;
    // image: string;
    expiry: number; //ngay het han
    description?: string;
    file?: File;
}
