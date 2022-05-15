import { UserDto } from '../user/UserDto';

export interface CommentDto {
    id: string;
    customerId: string;
    productId: string;
    content: string;
    createdAt: string;
    customer: UserDto;
}
