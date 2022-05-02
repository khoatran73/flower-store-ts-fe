import * as React from 'react';
import { CSSProperties, ReactChild, ReactNode } from 'react';
import Grid, { GridProps } from './grid/Grid';
import Loading from './Loading';
// import Loading from '~/components/Layout/Loading';

interface PureGirdProps extends GridProps {
    children?: ReactChild;
    wrapperClassName?: string;
    wrapperStyle?: CSSProperties;
}

export const BaseGrid = React.forwardRef<Grid, PureGirdProps>((props, ref) => {
    let GridToolbar: any = null;
    React.Children.forEach(props.children, (child) => {
        const isValid = React.isValidElement<typeof GridToolbar>(child);
        if (isValid) {
            GridToolbar = child;
        }
    });

    return (
        <div
            className={`id-grid ${props.wrapperClassName || ''}`}
            style={props.wrapperStyle}
        >
            {GridToolbar}
            <Grid
                ref={ref}
                headerHeight={props.headerHeight || 40}
                height={'100%'}
                numberRows={true}
                globalFilter={false}
                skeleton={true}
                floatingFilter={false}
                headerHorizotalLines={false}
                {...props}
                columnDefs={props.columnDefs}
                loading={<Loading loading={true} text={'Đang tải dữ liệu'} />}
                defaultColDef={{
                    resizable: true,
                    floatingFilter: false,
                    ...props.defaultColDef,
                }}
                actionRows={
                    props.actionRows && {
                        ...props.actionRows,
                        pinned: 'right',
                        items: props.actionRows?.items || [],
                    }
                }
            />
        </div>
    );
});
