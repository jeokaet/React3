import axios from "axios";

const caxios = axios.create({
    baseURL:"http://localhost"
});

caxios.interceptors.request.use(
 (config) => {
    const token = sessionStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
 }
)

// caxios.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error)=>{
//         switch(error.status) {
//             case 401:
//                 alert("로그인 먼저 수행 필요")
//                 break;
//             case 403:
//                 alert("접근 권한이 없습니다")
//                 break;
//         }
//     }
// )

export default caxios;