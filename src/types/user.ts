export type TUser = {
    _id:string
    name:string,
    phone: string,
    email:string,
    password: string,
    role: 'user' | 'admin',
    isDeactivate: boolean,
    isBlocked: boolean,
    isDeleted: boolean,
    __v:number
}
