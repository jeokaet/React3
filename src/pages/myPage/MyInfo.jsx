import { useEffect, useState } from 'react';
import Styles from './MyInfo.module.css';
import { Grid, Box, Typography, Button, Avatar } from '@mui/material';
import caxios from '../../api/caxios';
import useAuthStore from '../../store/useAuthStore';


function MyInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const loginId = useAuthStore((state)=> state.loginId);
  
  console.log(loginId);

  const fetchUserInfo = async () => {

  const response = await caxios.get("/mypage/getMembers");
  console.log(response.data);
  setUserInfo(response.data);
  }

  useEffect(()=>{
    fetchUserInfo();
  },[]);
  



  return(
<Box sx={{ flexGrow: 1, p: 2 ,width:'100vw',boxSizing:'border-box'}}>
      <Grid container spacing={2}>
        {/* 왼쪽 프로필 이미지 */}
        <Grid item xs={12} md={3}>
          <Box display="flex" justifyContent="center">
            <Avatar
              sx={{
                marginLeft:20,
                width: 250,
                height: 250,
                mt: 5,
                bgcolor: 'grey.400',
              }}
            />
          </Box>
        </Grid>

        {/* 오른쪽 정보 영역 */}
        <Grid item xs={12} md={9}>
          <Box
            sx={{
             
              borderRadius: 2,
              p: 3,
              mb: 2,
              boxSizing: 'border-box',
            
              marginLeft:20,
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              backgroundColor:'#f0f0f0'
            }}
          >
            <Typography variant="h6">아이디</Typography>
            <Typography>abc123</Typography>

            <Typography variant="h6">비밀번호</Typography>
            <Typography>asdsa1234</Typography>

            <Typography variant="h6">이메일</Typography>
            <Typography>abc123@naver.com</Typography>

            <Typography variant="h6">주소</Typography>
            <Typography>강남구 메밀동 모밀로123-12</Typography>

            <Typography variant="h6">닉네임</Typography>
            <Typography>닉네임뭐로하지</Typography>

            <Typography variant="h6">전화번호</Typography>
            <Typography>01012345678</Typography>
          </Box>

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="contained" color="primary">정보 수정하기</Button>
            <Button variant="outlined" color="error">회원 탈퇴</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>

); 
}

export default MyInfo;

  // <div className={Styles.container}>
  //   <div className={Styles.profile}>
  //       <div className={Styles.img}></div>
  //   </div>
  //   <div className={Styles.info}>
  //       <div className={Styles.contents}>
  //           <div>아이디</div>
  //           <p>abc123</p>
  //           <div>비밀번호</div>
  //           <p>asdsa1234</p>
  //           <div>이메일</div>
  //           <p>abc123@naver.com</p>
  //           <div>주소</div>
  //           <p>강남구 메밀동 모밀로123-12</p>
  //           <div>닉네임</div>
  //           <p>닉네임뭐로하지</p>
  //           <div>전화번호</div>
  //           <p>01012345678</p>
  //       </div>
  //       <div className={Styles.btnbox}>
  //       <button className={Styles.update}>정보 수정하기</button>
  //       <button className={Styles.delete}>회원 탈퇴</button>
  //       </div>
  //   </div>
  // </div>