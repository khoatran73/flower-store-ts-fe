import React from "react";
import Comment from "./Comment";
import {
    Button,
    Paper,
    TextField,
    IconButton,
    Divider,
    Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ProductComment: React.FC = () => {
    return (
        <div className="my-10">
            <div>
                <Button variant="outlined" disabled>
                    Bình luận
                </Button>
            </div>
            <Paper className="p-4 mt-3">
                <Comment desc="bong hoa dep qua" />
                <Comment desc="hoa dep. 10 diem" />
                <Comment desc="hoa dep. 10 diem" />
                <div className="flex p-4">
                    <div className="w-[5%]">
                        <Avatar
                            alt="Khoa Henry"
                            src="https://avatars.githubusercontent.com/u/77377243?s=400&u=f1135698dedef3ad6fbb056b8f9e4bed4c1a92e0&v=4"
                        />
                    </div>
                    <div className="w-[95%] flex items-center justify-end">
                        <TextField
                            className="w-full"
                            placeholder="Aa..."
                            variant="outlined"
                            size="small"
                        />
                        <IconButton
                            color="primary"
                            sx={{ p: "10px" }}
                            aria-label="directions"
                        >
                            <SendIcon />
                        </IconButton>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default ProductComment;
