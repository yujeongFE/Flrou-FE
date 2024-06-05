import axios from "axios";

export const SignUpRequest = async (nickName, userId, userPw) => {
  try {
    const response = await axios.post("http://localhost:3000/user/signup", {
      nickname: nickName,
      user_id: userId,
      user_pw: userPw,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("회원가입 에러:", error.message);
    return error;
  }
};
