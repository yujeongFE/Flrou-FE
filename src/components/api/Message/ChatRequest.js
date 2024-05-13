import axios from "axios";

export async function ChatRequest(user_id, content, mode, isUser) {
  try {
    const requestData = {
      user_id: user_id,
      content: content,
      mode: mode,
      isUser: isUser,
    };

    const response = await axios.post("http://localhost:3000/chat/send", requestData);

    return response.data;
  } catch (error) {
    throw new Error("채팅 요청에 실패했습니다.");
  }
}
