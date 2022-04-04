import React from "react";
import Comment from "./Comment";
import { Button, Paper, TextField, IconButton, Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface IComment {
    numberLike: number;
    desc: string;
}

const initCommentList: IComment[] = [
    {
        numberLike: 1,
        desc: "comment 1",
    },
    {
        numberLike: 2,
        desc: "comment 2",
    },
];

const ProductComment: React.FC = () => {
    const [comment, setComment] = React.useState<string>("");
    const [commentList, setCommentList] =
        React.useState<IComment[]>(initCommentList);

    const renderCommentList = () => {
        return commentList.map((comment, index) =>
            index + 1 < commentList.length ? (
                <Comment
                    key={index}
                    numberLike={comment.numberLike}
                    liked={false}
                    desc={comment.desc}
                />
            ) : (
                <Comment
                    key={index}
                    numberLike={comment.numberLike}
                    liked={false}
                    desc={comment.desc}
                    hideDivider={true}
                />
            )
        );
    };

    const handleSubmitComment = () => {
        if (!comment) return;

        const newComment: IComment = {
            numberLike: 0,
            desc: comment,
        };

        setCommentList((cL) => [...commentList, newComment]);
        setComment("");
    };

    return (
        <div className="my-10">
            <div>
                <Button variant="outlined" disabled>
                    Bình luận
                </Button>
            </div>
            <Paper className="p-4 mt-3">
                {renderCommentList()}
                <div className="flex p-4">
                    <div className="w-[5%]">
                        <Avatar
                            alt="Khoa Henry"
                            src="https://avatars.githubusercontent.com/u/77377243?s=400&u=f1135698dedef3ad6fbb056b8f9e4bed4c1a92e0&v=4"
                        />
                    </div>
                    <div className="w-[95%] flex items-center justify-between">
                        <TextField
                            className="w-[93%] "
                            placeholder="Aa..."
                            variant="outlined"
                            size="small"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) handleSubmitComment();
                            }}
                        />
                        <IconButton
                            color="primary"
                            sx={{ p: "10px" }}
                            aria-label="directions"
                            onClick={handleSubmitComment}
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
