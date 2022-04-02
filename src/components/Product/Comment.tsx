import React from "react";
import { Avatar, Divider, Grid } from "@mui/material";

interface Props {
    desc: string;
}

const Comment: React.FC<Props> = (props: Props) => {
    const { desc } = props;

    const imgLink =
        "https://avatars.githubusercontent.com/u/77377243?s=400&u=f1135698dedef3ad6fbb056b8f9e4bed4c1a92e0&v=4";

    return (
        <div className="p-4">
            <Grid container wrap="nowrap" spacing={2} className="mb-8">
                <Grid item>
                    <Avatar alt="Anh Khoa" src={imgLink} />
                </Grid>
                <Grid style={{ justifyContent: "left" }} item xs zeroMinWidth>
                    <h4 className="font-semibold">Anh khoa tran</h4>
                    <p className="text-left">{desc}</p>
                    <p className="text-left text-gray-500 text-sm mt-2">
                        posted 1 minute ago
                    </p>
                </Grid>
            </Grid>
            <Divider />
        </div>
    );
};

export default Comment;
