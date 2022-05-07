import { AccountCreateDto, AccountDto } from '../auth/LoginDto';
import { StoreDto } from '../store/StoreDto';

export interface UserDto {
    account: AccountDto;
    store: StoreDto;
}

export interface UserCreateDto {
    account: AccountCreateDto;
    storeId: string;
}
