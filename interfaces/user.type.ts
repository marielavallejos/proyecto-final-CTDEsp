export interface IUserRegister  {
    name: string;
    lastname: string;
    password: string;
    email: string;
}
export interface IUser  {
    name: string;
    lastname: string;
    password: string;
    profileUrl: string;
    email: string;
    userType: userType;
}

export interface ILogin  {
    username: string;
    password: string;
}

type userType = {
    id: number
}

