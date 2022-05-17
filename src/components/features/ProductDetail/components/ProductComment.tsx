import SendIcon from '@mui/icons-material/Send';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {
    Avatar,
    Badge,
    Button,
    Divider,
    Grid,
    IconButton,
    Paper,
    TextField,
} from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { CommentDto, ReactionCreateDto } from '~/types/comment/CommentDto';
import { UserDto } from '~/types/user/UserDto';
import { GET_CUSTOMER_API } from '../../Profile/api';
import {
    COMMENT_CREATE_API,
    COMMENT_INDEX_API,
    REACTION_CREATE_API,
} from '../api';

interface Props {
    productId: string | undefined;
}

const ProductComment: FC<Props> = (props) => {
    const { productId } = props;
    const [comments, setComments] = useState<Array<CommentDto>>();
    const [customer, setCustomer] = useState<UserDto>();
    const [loading, setLoading] = useState<boolean>(true);
    const [content, setContent] = useState<string>('');

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

        const createDto = {
            customerId: customer?.id,
            productId: productId,
            content: content,
        };

        setLoading(true);
        await axios.post(COMMENT_CREATE_API, createDto).then((res) => {
            if (res.data.success) {
                setLoading(false);
                setContent('');
                fetchComment();
            }
        });
    };

    const handleLikeComment = async (
        customerId: string | undefined,
        commentId: string | undefined
    ) => {
        const createDto: ReactionCreateDto = {
            customerId,
            commentId,
        };

        await axios.post(REACTION_CREATE_API, createDto).then((res) => {
            if (res.data.success) {
                fetchComment();
            }
        });
    };

    const likedOrnot = (
        customerId: string | undefined,
        comment: CommentDto
    ) => {
        const filteredArray = comment.reactions.filter((element) => {
            if (
                element.customerId === customerId &&
                element.commentId === comment.id
            ) {
                return true;
            }

            return false;
        });

        if (filteredArray.length > 0) {
            return (
                <span
                    className='text-blue-700 font-semibold text-sm hover:underline hover:cursor-pointer'
                    onClick={() => handleLikeComment(customer?.id, comment?.id)}
                >
                    Thích
                </span>
            );
        } else {
            return (
                <span
                    className='text-blue-700 text-sm hover:underline hover:cursor-pointer'
                    onClick={() => handleLikeComment(customer?.id, comment?.id)}
                >
                    Thích
                </span>
            );
        }
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
                                    {likedOrnot(customer?.id, comment)}
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
                                            badgeContent={comment?.countLike}
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
                                        {moment(comment.createdAt)
                                            .locale('vi')
                                            .fromNow()}
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
                                className='w-[93%]'
                                label='Aa...'
                                size='small'
                                name='comment'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
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
