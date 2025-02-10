export interface JWTDataContent{
    authorities : string;
    exp: string;
    iat: string;
    iss: string;
    sub: string;
    username: string;
}