import { useState } from 'react';
import { ProductDto } from '../../../../types/product/ProductDto';

interface Props {
    data: ProductDto[];
    itemsPerPage: number;
}

export const usePagination = (data: ProductDto[], itemsPerPage: number) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const maxPage = Math.ceil(data.length / itemsPerPage);

    const currentData = () => {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin, end);
    };

    const next = () => {
        setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
    };

    const prev = () => {
        setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    };

    const jump = (page: number) => {
        const pageNumber = Math.max(1, page);
        setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
    };

    return { next, prev, jump, currentData, currentPage, maxPage };
};
