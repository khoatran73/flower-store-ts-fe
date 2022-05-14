import { AccountCreateDto, AccountDto } from '../auth/LoginDto';
import { StoreDto } from '../store/StoreDto';

export interface UserDto extends AccountDto {
    store: StoreDto;
    storeId: string;
}

// export interface CustomerDto extends AccountDto {
//     storeId: string;
// }

export interface UserCreateDto {
    account: AccountCreateDto;
    storeId: string;
}

export interface Province {
    code: number;
    codename: string;
    districts: any[];
    division_type: string;
    name: string;
    phone_code: string;
}
