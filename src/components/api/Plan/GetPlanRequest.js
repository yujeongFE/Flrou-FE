import axios from "axios";

export async function GetPlanRequest(userId, year, month) {
  try {
    const response = await axios.get(`http://localhost:3000/plan/getPlanByMonth/${userId}/${year}/${month}`);
    return response.data;
  } catch (error) {
    throw new Error("일정 수신에 실패했습니다.");
  }
}
