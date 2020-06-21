export interface LoginRetorno {
    avatar: string,
    id: number,
    email: string,
    token: string,
    username: string
}

export interface LoginEnvio {
    username: string,
    password: string
}