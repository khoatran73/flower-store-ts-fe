import { AccountCreateDto, AccountDto } from '../auth/LoginDto';
import { StoreDto } from '../store/StoreDto';

export interface UserDto extends AccountDto {
    store: StoreDto;
}

export interface UserCreateDto {
    account: AccountCreateDto;
    storeId: string;
}
