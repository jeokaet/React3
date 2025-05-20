import { useEffect, useState } from 'react';
import MyInfoStyles from './MyInfo.module.css';
import { Grid, Box, Typography, Button, Avatar, Checkbox, FormControlLabel, Paper } from '@mui/material';
import { TextField } from '@mui/material';
import caxios from '../../api/caxios';
import useAuthStore from '../../store/useAuthStore';
import React from 'react';




function MyInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const loginId = useAuthStore((state) => state.loginId);


  const fetchUserInfo = async () => {

    const response = await caxios.get("/mypage/getMembers", {
      params: { loginId }
    });
    console.log(response.data);
    setUserInfo(response.data);
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleEditClick = () => setEditMode(true);
  const handleCancelClick = () => setEditMode(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev, [name]: value,
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
    if (!confirm) return;

    try {
      await caxios.delete("/mypage/deleteMember", {
        params: { loginId: userInfo.loginId },
      });
      alert("회원 탈퇴가 완료 되었습니다.");
      useAuthStore.getState().logout();
      window.location.href = "http://localhost:3000";

    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
      alert("회원 탈퇴 중 오류가 발생했습니다.");
    }
  };


  return (
    <Box className={MyInfoStyles.container}>
      <Grid container spacing={3} justifyContent="center"  sx={{width: "100%"}}>
        <Grid item xs={12} md={9} sx={{width: "100%"}}>
          <Paper elevation={0} className={MyInfoStyles.card}>

            <Box className={MyInfoStyles.fieldContainer}>
              <Typography className={MyInfoStyles.fieldLabel}>아이디</Typography>
              <Typography className={MyInfoStyles.fieldValue}>{userInfo?.loginId}</Typography>
            </Box>

            <Box className={MyInfoStyles.fieldContainer}>
              <Typography className={MyInfoStyles.fieldLabel}>생년월일</Typography>
              <Typography className={MyInfoStyles.fieldValue}>{userInfo?.birth}</Typography>
            </Box>

            <Box className={MyInfoStyles.fieldContainer}>
              <Typography className={MyInfoStyles.fieldLabel}>이메일</Typography>
              {editMode ? (
                <TextField
                  name='email'
                  value={userInfo?.email || ''}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  sx={MyInfoStyles.inputField}
                />
              ) : (
                <Typography className={MyInfoStyles.fieldValue}>{userInfo?.email}</Typography>
              )}
            </Box>

            <Box className={MyInfoStyles.fieldContainer}>
              <Typography className={MyInfoStyles.fieldLabel}>주소</Typography>
              {editMode ? (
                <TextField
                  name='address1'
                  value={userInfo?.address1 || ''}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  sx={MyInfoStyles.inputField}
                />
              ) : (
                <Typography className={MyInfoStyles.fieldValue}>{userInfo?.address1}</Typography>
              )}
            </Box>

            <Box className={MyInfoStyles.fieldContainer}>
              <Typography className={MyInfoStyles.fieldLabel}>닉네임</Typography>
              {editMode ? (
                <TextField
                  name='userName'
                  value={userInfo?.userName || ''}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  sx={MyInfoStyles.inputField}
                />
              ) : (
                <Typography className={MyInfoStyles.fieldValue}>{userInfo?.userName}</Typography>
              )}
            </Box>

            <Box className={MyInfoStyles.fieldContainer}>
              <Typography className={MyInfoStyles.fieldLabel}>위치 동의 여부</Typography>
              {editMode ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={userInfo?.agreement === 'Y'}
                      onChange={(e) =>
                        setUserInfo((prev) => ({
                          ...prev,
                          agreement: e.target.checked ? 'Y' : 'N',
                        }))
                      }
                      sx={{
                        color: '#19a1ad',
                        '&.Mui-checked': {
                          color: '#19a1ad',
                        },
                      }}
                    />
                  }
                  label="위치 정보를 수집하는데 동의합니다"
                />
              ) : (
                <Typography className={MyInfoStyles.fieldValue}>
                  {userInfo?.agreement === 'Y' ? '동의함' : '동의 안 함'}
                </Typography>
              )}
            </Box>
          </Paper>

          <Box className={MyInfoStyles.buttonContainer}>
            {editMode ? (
              <>
                <Button
                  variant="contained"
                  onClick={handleSaveClick}
                  sx={{
                    width: '120px',
                    height: '40px',
                    marginTop: '10px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: '#19a1ad',
                    color: '#fff',
                    border: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: '#f89f5e',
                      boxShadow: 'none',
                    },
                  }}
                >
                  저장
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCancelClick}
                  sx={{
                    width: '120px',
                    height: '40px',
                    marginTop: '10px',
                    marginLeft: '10px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: 'transparent',
                    color: '#f89f5e',
                    border: '1px solid #f89f5e',
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(244, 67, 54, 0.08)',
                      boxShadow: 'none',
                    },
                  }}
                >
                  취소
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  onClick={() => setEditMode(true)}
                  sx={{
                    width: '150px',
                    height: '40px',
                    marginTop: '10px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: '#19a1ad',
                    color: '#fff',
                    border: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: '#f89f5e',
                      boxShadow: 'none',
                    },
                  }}
                >
                  정보 수정하기
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleDeleteClick}
                  sx={{
                    width: '120px',
                    height: '40px',
                    marginTop: '10px',
                    marginLeft: '10px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: 'transparent',
                    color: '#f89f5e',
                    border: '1px solid #f89f5e',
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(244, 67, 54, 0.08)',
                      boxShadow: 'none',
                    },
                  }}
                >
                  회원 탈퇴
                </Button>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
    // {/* <Box sx={{ flexGrow: 1, p: 2 ,width:'100vw',boxSizing:'border-box'}}>
    //       <Grid container spacing={2}>
    //         {/* 오른쪽 정보 영역 */}
    //     <Grid item xs={12} md={9}>
    //       <Box
    //         sx={{

    //           borderRadius: 2,
    //           p: 3,
    //           mb: 2,
    //           boxSizing: 'border-box',
    //           display: 'flex',
    //           flexDirection: 'column',
    //           gap: 1.5,
    //           backgroundColor:'#f0f0f0'
    //         }}
    //       >
    //         <Typography variant="h6">아이디</Typography>
    //         <Typography>{userInfo?.loginId}</Typography>
    //         <Typography variant="h6">생년월일</Typography>
    //         <Typography>{userInfo?.birth}</Typography>

    //         <Typography variant="h6">이메일</Typography>
    //         {editMode ? ( 
    //           <TextField name='email' value={userInfo?.email || ''} onChange={handleChange} />
    //         ) : (
    //           <Typography>{userInfo?.email}</Typography>
    //         )}
    //         <Typography variant="h6">주소</Typography>
    //          {editMode ? ( 
    //           <TextField name='address1' value={userInfo?.address1 || ''} onChange={handleChange} />
    //         ) : (
    //           <Typography>{userInfo?.address1}</Typography>
    //         )}


    //         <Typography variant="h6">닉네임</Typography>
    //          {editMode ? ( 
    //           <TextField name='userName' value={userInfo?.userName || ''} onChange={handleChange} />
    //         ) : (
    //          <Typography>{userInfo?.userName}</Typography>
    //         )}

    //         <Typography variant="h6">위치 동의 여부</Typography>
    //         {editMode ? ( 
    //           <FormControlLabel 
    //           control={
    //             <Checkbox
    //             checked={userInfo?.agreement ==='Y'}
    //             onChange={(e)=>
    //               setUserInfo((prev)=>({
    //                 ...prev,
    //                 agreement: e.target.checked ? 'Y' : 'N',
    //               }))
    //             }
    //             />
    //           }
    //           label="위치 정보를 수집하는데 동의합니다"
    //           />
    //         ) : (
    //            <Typography>{userInfo?.agreement === 'Y' ? '동의함' : '동의 안 함'}</Typography>
    //         )}


    //       </Box>

    //       <Box display="flex" justifyContent="flex-end" gap={2} sx={{marginLeft:23}}>
    //        {editMode ? (
    //         <>
    //          <Button variant="contained" color="primary" onClick={handleSaveClick}>저장</Button>
    //         <Button variant="outlined" color="error" onClick={handleCancelClick}>취소</Button>
    //        </>
    //        ) : (
    //         <>
    //         <Button variant="contained" sx={{ width: "55%",  backgroundColor: "#19a1ad", "&:hover": { backgroundColor: "#f89f5e",},}} onClick={()=>setEditMode(true)}>정보 수정하기</Button>
    //         <Button variant="outlined" color="error" onClick={handleDeleteClick}>회원 탈퇴</Button>
    //        </>
    //        )}

    //       </Box>
    //     </Grid>
    //   </Grid>
    // </Box> */}

  );
}

export default MyInfo;
