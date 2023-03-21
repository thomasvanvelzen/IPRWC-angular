import { User } from "./user.type";

export class Authority {
    id!: string;
    role!: string;
    token!: string;
    user!: User;
}