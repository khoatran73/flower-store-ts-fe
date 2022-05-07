import { ProductDto } from '../types/product/ProductDto';

export const customRowData = (data: ProductDto[]) => {
    let newRowData: any[] = [];
    // let columnIndexs: number[];
    data.map((row: ProductDto, index: number) => {
        newRowData.push({ ...row, stt: index + 1 });
    });

    return newRowData;
};
