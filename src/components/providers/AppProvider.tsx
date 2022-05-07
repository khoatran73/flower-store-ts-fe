import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
};

export const AppProvider = (props: Props) => {
    return (
        <>
            <Router>{props.children}</Router>
        </>
    );
};
