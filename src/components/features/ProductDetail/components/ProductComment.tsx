import SendIcon from '@mui/icons-material/Send';
import {
    Avatar,
    Button,
    IconButton,
    Paper,
    TextField,
    Grid,
    Badge,
    Divider,
} from '@mui/material';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { CommentDto } from '~/types/comment/CommentDto';
import { GET_CUSTOMER_API } from '../../Profile/api';
import { COMMENT_CREATE_API, COMMENT_INDEX_API } from '../api';
import Comment from './Comment';
import { UserDto } from '~/types/user/UserDto';
import Loading from '../../../../components/utils/Loading';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

interface Props {
    productId: string | undefined;
}

const ProductComment: FC<Props> = (props) => {
    const { productId } = props;
    const [comments, setComments] = useState<Array<CommentDto>>();
    const [customer, setCustomer] = useState<UserDto>();
    const [loading, setLoading] = useState<boolean>(true);

    const fetchComment = async () => {
        const res = await axios.get(`${COMMENT_INDEX_API}/${productId}`);

        setComments(res.data.result as Array<CommentDto>);
        setLoading(false);
    };

    const fetchCustomer = () => {
        const isLogin = localStorage.getItem('isLogin');
        axios.get(`${GET_CUSTOMER_API}/${isLogin}`).then((res) => {
            if (res.data.success) {
                setCustomer(res.data.result);
            }
        });
    };

    useEffect(() => {
        fetchComment();
        fetchCustomer();
    }, []);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const comment = form.get('comment');

        const createDto = {
            customerId: customer?.id,
            productId: productId,
            content: comment,
        };

        setLoading(true);
        await axios.post(COMMENT_CREATE_API, createDto).then((res) => {
            if (res.data.success) {
                setLoading(false);
                fetchComment();
            }
        });
    };

    // if (loading) return <Loading loading={loading} />;
    return (
        <div className='my-10'>
            <div>
                <Button variant='outlined' disabled>
                    Bình luận
                </Button>
            </div>
            <Paper className='p-4 mt-3'>
                {comments?.map((comment: CommentDto, index: number) => (
                    <div className='p-4' key={comment.id}>
                        <Grid
                            container
                            wrap='nowrap'
                            spacing={2}
                            className='mb-8'
                        >
                            <Grid item>
                                <Avatar
                                    alt='Anh Khoa'
                                    src={comment.customer.image}
                                />
                            </Grid>
                            <Grid
                                style={{ justifyContent: 'left' }}
                                item
                                xs
                                zeroMinWidth
                            >
                                <h4 className='font-semibold'>
                                    {comment.customer.fullname}
                                </h4>
                                <p className='text-left'>{comment.content}</p>
                                <div className='flex items-center mt-1 select-none'>
                                    {/* {like ? ( */}
                                    <span
                                        className='text-blue-700 font-semibold text-sm hover:underline hover:cursor-pointer'
                                        // onClick={handleLikeComment}
                                    >
                                        Thích
                                    </span>
                                    {/* ) : (
                                        <span
                                            className='text-blue-700 text-sm hover:underline hover:cursor-pointer'
                                            onClick={handleLikeComment}
                                        >
                                            Thích
                                        </span>
                                    )} */}

                                    <span className='mx-1 text-gray-400 text-xs'>
                                        •
                                    </span>
                                    <span
                                        className='text-blue-700 text-sm hover:underline hover:cursor-pointer'
                                        // onClick={handleReplyComment}
                                    >
                                        Phản hồi
                                    </span>
                                    <span className='mx-1 text-gray-400 text-xs'>
                                        •
                                    </span>
                                    <span className='text-xs flex items-center'>
                                        <Badge
                                            // badgeContent={countLike}
                                            color='error'
                                        >
                                            <ThumbUpIcon
                                                color='primary'
                                                fontSize='small'
                                                style={{ width: '16px' }}
                                            />
                                        </Badge>
                                    </span>
                                    <span className='text-left text-gray-400 text-sm ml-2'>
                                        {comment.createdAt}
                                    </span>
                                </div>
                            </Grid>
                        </Grid>
                        {index < comments.length - 1 && <Divider />}
                    </div>
                ))}
                <div className='flex p-4 mt-5'>
                    <div className='w-[5%]'>
                        <Avatar
                            alt={customer?.fullname}
                            src={customer?.image}
                        />
                    </div>
                    <form className='w-[95%]' onSubmit={onSubmit}>
                        <div className='flex items-center justify-between'>
                            <TextField
                                className='w-[93%] '
                                placeholder='Aa...'
                                size='small'
                                name='comment'
                                // value={comment}
                                // onChange={(e) => setComment(e.target.value)}
                                // onKeyDown={(e) => {
                                //     if (e.keyCode === 13) handleSubmitComment();
                                // }}
                            />
                            <IconButton
                                color='primary'
                                sx={{ p: '10px' }}
                                aria-label='directions'
                                type='submit'
                            >
                                <SendIcon />
                            </IconButton>
                        </div>
                    </form>
                </div>
            </Paper>
        </div>
    );
};

export default ProductComment;
