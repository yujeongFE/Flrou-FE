import { useState, useEffect } from "react";
import axios from "axios";

const useKakaoLogin = () => {
  const [userName, setUserName] = useState(""); // 유저 이름
  const [userEmail, setUserEmail] = useState(""); // 유저 이메일
  const [userId, setUserId] = useState(""); // 유저 아이디

  const CLIENT_ID = process.env.REACT_APP_KAKAO_APP_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code"); // 인가 코드 추출
    if (code) {
      fetchAccessToken(code);
    }
  }, []);

  const getKakaoCode = () => {
    let redirect_uri = REDIRECT_URI;
    window.location.href =
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=account_email,profile_nickname`;
  };

  // 액세스 토큰을 가져오는 함수
  const fetchAccessToken = (code) => {
    const params = {
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      code: code,
    };

    const query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    fetch(`https://kauth.kakao.com/oauth/token?${query}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { access_token } = data;

        // 토큰을 로컬 스토리지에 저장
        access_token && localStorage.setItem("accessToken", access_token);

        // 유저 정보를 가져오는 함수 호출
        fetchUserInfo(access_token);
      });
  };

  // 유저 정보 받아오는 함수
  const fetchUserInfo = async (accessToken) => {
    try {
      const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
      });

      const data = response.data;
      setUserName(data.kakao_account.profile.nickname);
      setUserEmail(data.kakao_account.email);
      setUserId(data.id);
    } catch (error) {
      console.error("Kakao user info error:", error);
    }
  };

  return {
    userName,
    userEmail,
    userId,
    getKakaoCode,
  };
};

export default useKakaoLogin;
