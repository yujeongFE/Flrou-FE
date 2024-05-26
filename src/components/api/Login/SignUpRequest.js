import axios from "axios";

export const SignUpRequest = async (userId, userPw, nickName) => {
  try {
    const response = await axios.post("http://localhost:3000/user/signup", {
      user_id: userId,
      user_pw: userPw,
      nickname: nickName,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("회원가입 에러:", error.message);
    return error;
  }
};
