export interface MenuLayout {
    name: string;
    active: boolean;
    route: string;
    background: string;
    level: number;
    badgeNumber?: number;
    icon: string;
    key: string;
    parentKey?: string;
    leaf?: boolean;
    children?: MenuLayout[];
    isDisplay?: boolean;
    breadcrumbs?: Array<string>;
    isLeaf?: boolean;
    hasPermissionToAccess?: boolean;
    path: string;
}
