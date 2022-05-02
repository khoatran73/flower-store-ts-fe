// @flow
import { Button } from '@mui/material';
import React, { CSSProperties } from 'react';

type ConditionSearchField = {
    hasSearchField?: boolean;
};

type ToolbarType = {
    rightToolbarStyle?: CSSProperties;
    leftToolbarStyle?: CSSProperties;
};

export type GridToolbarProps = {
    hasCreateButton?: boolean;
    hasRefreshButton?: boolean;
    onClickCreateButton?: (props: GridToolbarProps) => void;
    filterValues?: Record<string, any>;
    filterFormChange?: (name: string, value: any) => void;
    renderBodyToolbar?: (props: GridToolbarProps) => React.ReactNode;
    renderFilter?: (props: GridToolbarProps) => React.ReactNode;
    renderAdditionRightToolbar?: (props: GridToolbarProps) => React.ReactNode;
    renderAdditionLeftToolbar?: (props: GridToolbarProps) => React.ReactNode;
} & ConditionSearchField &
    ToolbarType;

const basicToolbar = (props: GridToolbarProps) => {
    const {
        hasSearchField = false,
        hasCreateButton = true,
        hasRefreshButton = true,
        renderAdditionLeftToolbar,
        renderAdditionRightToolbar,
    } = props;
    return (
        <>
            <div className={'grid-left-toolbar'} style={props.leftToolbarStyle}>
                {renderAdditionLeftToolbar && renderAdditionLeftToolbar(props)}
            </div>
            <div
                className={'grid-right-toolbar'}
                style={props.rightToolbarStyle}
            >
                {renderAdditionRightToolbar?.(props)}
                {hasCreateButton ? (
                    <Button
                        onClick={() => props.onClickCreateButton?.(props)}
                        variant='contained'
                        color='success'
                        size='small'
                    />
                ) : null}
            </div>
        </>
    );
};

export const GridToolbar: React.FC<GridToolbarProps> = (props) => {
    const { filterFormChange, filterValues = {} } = props;
    return (
        <>
            <div className={'grid-toolbar'}>
                <>
                    {props.renderBodyToolbar
                        ? props.renderBodyToolbar(props)
                        : basicToolbar(props)}
                </>
            </div>
        </>
    );
};
