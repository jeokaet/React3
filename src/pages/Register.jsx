import React, { useState } from "react";
import caxios from "../api/caxios"; // API 인스턴스 맞게 경로 설정
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    loginId: "",
    loginPw: "",
    nickName: "",
    profilePicture: "",
    phoneNumber: "",
    mainAddress: "",
    subAddress: "",
    postCode: "",
    emailAddress: "",
  });

  const [idChecked, setIdChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === "loginId") {
      setIdChecked(false); // 아이디를 다시 수정하면 중복체크 초기화
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!idChecked) {
      alert("아이디 중복확인을 해주세요!");
      return;
    }
    try {
      await caxios.post("/auth/register", formData);
      alert("회원가입 성공! 로그인 하세요.");
      window.location.href = "/";
    } catch (error) {
      alert("회원가입 실패: " + (error.response?.data || ""));
    }
  };

  const checkDuplicateId = async () => {
    if (!formData.loginId) {
      alert("아이디를 입력해주세요.");
      return;
    }
    try {
      const response = await caxios.get(`/auth/check-duplicate?loginId=${formData.loginId}`);
      if (response.data.exists) {
        alert("이미 사용 중인 아이디입니다.");
        setIdChecked(false);
      } else {
        alert("사용 가능한 아이디입니다!");
        setIdChecked(true);
      }
    } catch (error) {
      alert("중복확인 실패");
    }
  };

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataToUpload = new FormData();
    formDataToUpload.append("file", file);

    try {
      const response = await caxios.post("/upload/profile", formDataToUpload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData(prev => ({ ...prev, profilePicture: response.data.url }));
      alert("프로필 사진 업로드 성공!");
    } catch (error) {
      alert("프로필 사진 업로드 실패");
    }
  };

  const openPostCode = () => {
    new window.daum.Postcode({
      oncomplete: function(data) {
        setFormData(prev => ({
          ...prev,
          mainAddress: data.address,
          postCode: data.zonecode
        }));
      }
    }).open();
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleRegister}>
        <h1 className="register-title">회원가입</h1>

        {/* 기초 정보 */}
        <fieldset className="register-fieldset">
          <legend>기본 정보</legend>

          <div className="id-check-wrapper">
            <input
              type="text"
              name="loginId"
              placeholder="아이디 입력"
              className="register-input"
              value={formData.loginId}
              onChange={handleChange}
              required
            />
            <button type="button" className="id-check-button" onClick={checkDuplicateId}>
              중복확인
            </button>
          </div>

          <input
            type="password"
            name="loginPw"
            placeholder="비밀번호 입력"
            className="register-input"
            value={formData.loginPw}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nickName"
            placeholder="닉네임 입력"
            className="register-input"
            value={formData.nickName}
            onChange={handleChange}
          />
        </fieldset>

        {/* 프로필 업로드 */}
        <fieldset className="register-fieldset">
          <legend>프로필 사진</legend>

          <div className="profile-upload-wrapper">
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              className="register-input"
            />
            {formData.profilePicture && (
              <img src={formData.profilePicture} alt="프로필 미리보기" className="profile-preview" />
            )}
          </div>
        </fieldset>

        {/* 연락처 정보 */}
        <fieldset className="register-fieldset">
          <legend>연락처 정보</legend>

          <input
            type="text"
            name="phoneNumber"
            placeholder="전화번호 입력"
            className="register-input"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <input
            type="email"
            name="emailAddress"
            placeholder="이메일 주소 입력"
            className="register-input"
            value={formData.emailAddress}
            onChange={handleChange}
          />
        </fieldset>

        {/* 주소 정보 */}
        <fieldset className="register-fieldset">
          <legend>주소 정보</legend>

          <div className="address-search-wrapper">
            <input
              type="text"
              name="postCode"
              placeholder="우편번호 입력"
              className="register-input"
              value={formData.postCode}
              readOnly
            />
            <button type="button" className="address-search-button" onClick={openPostCode}>
              주소 검색
            </button>
          </div>
          <input
            type="number"
            name="mainAddress"
            placeholder="주소 입력"
            className="register-input"
            value={formData.mainAddress}
            onChange={handleChange}
            readOnly
          />
          <input
            type="text"
            name="subAddress"
            placeholder="상세 주소 입력"
            className="register-input"
            value={formData.subAddress}
            onChange={handleChange}
          />
          
        </fieldset>

        <button type="submit" className="register-button">
          회원가입 완료
        </button>
      </form>
    </div>
  );
}

export default Register;
