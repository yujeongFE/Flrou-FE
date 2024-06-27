import axios from "axios";

export const LoginRequest = async (userId, userPw) => {
  try {
    const response = await axios.post("http://localhost:3000/user/login", {
      user_id: userId,
      user_pw: userPw,
    });
    return response;
  } catch (error) {
    console.error("로그인 에러:", error.message);
    return error;
  }
};
