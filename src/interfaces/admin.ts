import { IRole } from "./role";

export interface IAdmin{
    id?: string;
    name: string;
    email: string;
    is_block: boolean;
    role_id: string;

    role?: IRole
}   
