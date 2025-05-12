import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token:null,//로그인 후 받은 인증 토큰
    loginId:null,//사용자의 id
    isAuth:false,//로그인 상태 (true, false)

    //token,userId,isAuth를 zustand 상태에 저장
    setAuth:(token,loginId) =>{
        set({token:token,loginId:loginId, isAuth:true});
        sessionStorage.setItem("token",token);//sessionStorage에 저장하여 페이지를 새로고침해도 인증 정보를 유지할 수 있도록 함
        sessionStorage.setItem("loginId",loginId);
        sessionStorage.setItem("isAuth",true);
    },
    
    logout: () =>{
        //로그아웃 클릭시 상태를 초기화
        set({token:null,loginId:null, isAuth:false});
        //sessionStorage에서 해당 데이터 삭제하여 완전한 로그아웃 처리
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("loginId");
        sessionStorage.removeItem("isAuth");
    },
    //브라우저 새로고침 시 상태 복원
    initialize: ()=>{
        //sessionStorage에서 기존 로그인 정보를 가져옴
        const token = sessionStorage.getItem("token");
        const loginId = sessionStorage.getItem("loginId");
        const isAuth = sessionStorage.getItem("isAuth");

        //로그인 상태가 유지되도록 zustand 상태 업데이트
        if(token && loginId){
            set({token:token, loginId:loginId, isAuth:isAuth})
        }
    }
}));

export default useAuthStore;