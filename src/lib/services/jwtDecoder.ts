import { jwtDecode } from "jwt-decode";
import { API } from '@/lib/services/api'

export const JWT_DECODER = ()=>{
    const token:any = localStorage.getItem("Token") 
    if (token == null) {
        return false
    }



    const decoded = jwtDecode(token);

    console.log(decoded);
    

    return true
}

