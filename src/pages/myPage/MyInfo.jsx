import { useEffect, useState } from 'react';
import Styles from './MyInfo.module.css';
import { Grid, Box, Typography, Button, Avatar } from '@mui/material';
import { TextField } from '@mui/material';
import {Checkbox,FormControlLabel} from '@mui/material';
import caxios from '../../api/caxios';
import useAuthStore from '../../store/useAuthStore';



function MyInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const loginId = useAuthStore((state)=> state.loginId);
  

  const fetchUserInfo = async () => {

  const response = await caxios.get("/mypage/getMembers",{
    params:{loginId}
  });
  console.log(response.data);
  setUserInfo(response.data);
  }

  useEffect(()=>{
    fetchUserInfo();
  },[]);
  
  const handleEditClick = () => setEditMode(true);
  const handleCancelClick = () => setEditMode(false);

  const handleChange =(e)=>{
    const {name,value} = e.target;
    setUserInfo((prev)=>({
      ...prev,[name]:value,
    }));
  };

  const handleSaveClick = async () => {
  try {
if (!userInfo.email || !userInfo.address1 || !userInfo.userName) {
      alert("이메일, 주소, 닉네임은 필수 항목입니다.");
      return; // 아무 것도 하지 않고 저장 중단
    }
    const updateData = {
      loginId: userInfo.loginId,      // 로그인 아이디 (필수)
      email: userInfo.email,          // 수정한 이메일
      address1: userInfo.address1,     // 주소 필드 이름 확인 필요
      userName: userInfo.userName,    // 닉네임
      agreement: userInfo.agreement   // 'Y' 또는 'N'
    };
  
    // 예시: 저장 API 호출
    await caxios.post("/mypage/updateMember", updateData);
    setEditMode(false); // 저장 후 edit 모드 종료
  } catch (error) {
    console.error("저장 실패:", error);
    // 실패 시 사용자에게 알림 등을 처리할 수 있음
  }
};

const handleDeleteClick = async () => {
  const confirm = window.confirm("정말로 회원을 탈퇴하시겠습니까?");
  if(!confirm) return;

  try{
    await caxios.delete("/mypage/deleteMember",{
      params:{loginId: userInfo.loginId},
    });
    alert("회원 탈퇴가 완료 되었습니다.");
    useAuthStore.getState().logout();
    window.location.href = "http://localhost:3000";

  }catch (error) {
    console.error("회원 탈퇴 실패:" , error);
    alert("회원 탈퇴 중 오류가 발생했습니다.");
  }
};


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
            <Typography>{userInfo?.loginId}</Typography>
            <Typography variant="h6">생년월일</Typography>
            <Typography>{userInfo?.birth}</Typography>

            <Typography variant="h6">이메일</Typography>
            {editMode ? ( 
              <TextField name='email' value={userInfo?.email || ''} onChange={handleChange} />
            ) : (
              <Typography>{userInfo?.email}</Typography>
            )}
            <Typography variant="h6">주소</Typography>
             {editMode ? ( 
              <TextField name='address1' value={userInfo?.address1 || ''} onChange={handleChange} />
            ) : (
              <Typography>{userInfo?.address1}</Typography>
            )}
      

            <Typography variant="h6">닉네임</Typography>
             {editMode ? ( 
              <TextField name='userName' value={userInfo?.userName || ''} onChange={handleChange} />
            ) : (
             <Typography>{userInfo?.userName}</Typography>
            )}

            <Typography variant="h6">위치 동의 여부</Typography>
            {editMode ? ( 
              <FormControlLabel 
              control={
                <Checkbox
                checked={userInfo?.agreement ==='Y'}
                onChange={(e)=>
                  setUserInfo((prev)=>({
                    ...prev,
                    agreement: e.target.checked ? 'Y' : 'N',
                  }))
                }
                />
              }
              label="위치 정보를 수집하는데 동의합니다"
              />
            ) : (
               <Typography>{userInfo?.agreement === 'Y' ? '동의함' : '동의 안 함'}</Typography>
            )}
              
            
          </Box>

          <Box display="flex" justifyContent="flex-end" gap={2} sx={{marginLeft:23}}>
           {editMode ? (
            <>
             <Button variant="contained" color="primary" onClick={handleSaveClick}>저장</Button>
            <Button variant="outlined" color="error" onClick={handleCancelClick}>취소</Button>
           </>
           ) : (
            <>
            <Button variant="contained" color="primary" onClick={()=>setEditMode(true)}>정보 수정하기</Button>
            <Button variant="outlined" color="error" onClick={handleDeleteClick}>회원 탈퇴</Button>
           </>
           )}
            
          </Box>
        </Grid>
      </Grid>
    </Box>

); 
}

export default MyInfo;
