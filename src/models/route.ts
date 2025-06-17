export interface AppRoute
{
    path: string;
    element: React.ReactNode;
    children?: AppRoute[];
    icon?: React.ReactNode;
    name?: string;
}