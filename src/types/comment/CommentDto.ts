import { UserDto } from '../user/UserDto';

export interface CommentDto {
    id: string;
    customerId: string;
    productId: string;
    content: string;
    createdAt: Date;
    countLike: number;
    reactions: ReactionDto[];
    customer: UserDto;
}

export interface ReactionDto {
    customerId?: string;
    commentId?: string;
}

export interface ReactionCreateDto {
    customerId?: string;
    commentId?: string;
}
