import { jwtDecode } from "jwt-decode"

export const verifyToken = (token:string) =>{
    console.log("decoded user",  jwtDecode(token))
    return  jwtDecode(token)
}