import BaseGrid, { BaseGridProps } from './BaseGrid';

export interface GridProps extends BaseGridProps {
    pageSizes?: number;
    optionPageSize?: boolean;
    formatLocale?: string;

    onRefresh?: (searchParams: Record<string, any>) => void;
}

declare class Grid extends BaseGrid<GridProps> {}

export default Grid;
