export type User = {
    _id:string;
    name: string;
    email: string;
    role: UserRole;
    phone:string;
}

export enum UserRole{
    User = "user",
    Admin = "admin"
}

export type CreateUserRequest = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: UserRole;
    phone: string;
}