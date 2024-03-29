import { API_URL } from '../../../../constant';

export const PRODUCT_INDEX_API = `${API_URL}/product`;
export const LIST_RELATED_API = `${API_URL}/product/get-list-related-product`;
export const LIST_CATEGORY_API = `${API_URL}/product/get-list-by-category`;
export const PRODUCT_CREATE_API = `${API_URL}/product/create`;
export const PRODUCT_UPDATE_API = `${API_URL}/product/update`;
export const PRODUCT_DELETE_API = `${API_URL}/product/delete`;

// export const STAFF_CREATE_DTO = `${API_URL}/user/create`;

export const CATEGORY_INDEX_API = `${API_URL}/product/categories`;

// account
export const STAFF_INDEX_API = `${API_URL}/user/list-staff`;

//stores
export const STORE_LIST_API = `${API_URL}/store`;

// staff
export const STAFF_CREATE_API = `${API_URL}/user/create-staff`;

//order

export const INDEX_ORDER_API = `${API_URL}/order`;

// customer
export const CUSTOMER_INDEX_API = `${API_URL}/user/list-customer`;
export const CUSTOMER_CREATE_API = `${API_URL}/user/create-customer`;

// provinces
export const GET_PROVINCES_API = 'https://provinces.open-api.vn/api';

//turnover
export const TURNOVER_API = `${API_URL}/report/turnover`;
