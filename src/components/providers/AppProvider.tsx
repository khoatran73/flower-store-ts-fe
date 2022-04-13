import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";

type IProps = {
    children: React.ReactNode;
};

export const AppProvider = (props: IProps) => {
    return (
        <>
            <Router>{props.children}</Router>
        </>
    );
};
