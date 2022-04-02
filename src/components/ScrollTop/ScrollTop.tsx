import * as React from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Zoom from "@mui/material/Zoom";
import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface Props {
    window?: () => Window;
}

function ScrollTop(props: Props) {
    const { window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleScrollTop = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector("#navbar");

        if (anchor) {
            anchor.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleScrollTop}
                role="presentation"
                sx={{ position: "fixed", bottom: 16, left: 16 }}
            >
                <Fab color="primary" size="large">
                    <KeyboardArrowUpIcon fontSize="large" />
                </Fab>
            </Box>
        </Zoom>
    );
}

export default ScrollTop;
