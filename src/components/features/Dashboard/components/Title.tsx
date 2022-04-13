import Typography from "@mui/material/Typography";
import * as React from "react";

interface IProps {
    children?: React.ReactNode;
}

const Title: React.FC<IProps> = (props: IProps) => {
    return (
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {props.children}
        </Typography>
    );
};

export default Title;
