import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Avatar, Badge, Divider, Grid } from '@mui/material';
import React from 'react';
import { CommentDto } from '~/types/comment/CommentDto';
import '../styles/Comment.scss';

interface Props {
    // desc: string;
    // hideDivider?: true;
    // liked: true | false;
    // numberLike: number;
    comment: CommentDto;
}

const Comment: React.FC<Props> = (props: Props) => {
    // const { desc, hideDivider, liked, numberLike } = props;
    const { comment } = props;
    // const [like, setLike] = React.useState<Boolean>(liked);
    // const [countLike, setCountLike] = React.useState<number>(numberLike);

    // const imgLink =
    //     'https://avatars.githubusercontent.com/u/77377243?s=400&u=f1135698dedef3ad6fbb056b8f9e4bed4c1a92e0&v=4';

    // const handleLikeComment = () => {
    //     setLike(!like);

    //     !like
    //         ? setCountLike(countLike + 1)
    //         : setCountLike(Math.max(countLike - 1, 0));
    // };

    // const handleReplyComment = () => {};

    return (
        <div className='p-4'>
            <Grid container wrap='nowrap' spacing={2} className='mb-8'>
                <Grid item>
                    <Avatar alt='Anh Khoa' src={comment.customer.image} />
                </Grid>
                <Grid style={{ justifyContent: 'left' }} item xs zeroMinWidth>
                    <h4 className='font-semibold'>
                        {comment.customer.fullname}
                    </h4>
                    <p className='text-left'>{comment.content}</p>
                    <div className='flex items-center mt-1 select-none'>
                        {/* {like ? (
                            <span
                                className='text-blue-700 font-semibold text-sm hover:underline hover:cursor-pointer'
                                onClick={handleLikeComment}
                            >
                                Thích
                            </span>
                        ) : (
                            <span
                                className='text-blue-700 text-sm hover:underline hover:cursor-pointer'
                                onClick={handleLikeComment}
                            >
                                Thích
                            </span>
                        )} */}

                        {/* <span className='mx-1 text-gray-400 text-xs'>•</span>
                        <span
                            className='text-blue-700 text-sm hover:underline hover:cursor-pointer'
                            onClick={handleReplyComment}
                        >
                            Phản hồi
                        </span>
                        <span className='mx-1 text-gray-400 text-xs'>•</span>
                        <span className='text-xs flex items-center'>
                            <Badge badgeContent={countLike} color='error'>
                                <ThumbUpIcon
                                    color='primary'
                                    fontSize='small'
                                    style={{ width: '16px' }}
                                />
                            </Badge>
                        </span> */}
                        <span className='text-left text-gray-400 text-sm ml-2'>
                            1 minute ago
                        </span>
                    </div>
                </Grid>
            </Grid>
            {/* {hideDivider ? <></> : <Divider />} */}
        </div>
    );
};

export default Comment;
