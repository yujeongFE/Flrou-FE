import axios from "axios";

export const CompletionRateRequest = async (user_id, select_year, select_month) => {
  try {
    const response = await axios.get(`http://localhost:3000/plan/getGraph/${user_id}/${select_year}/${select_month}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("월별 일정 완료 개수 조회 에러:", error.message);
    return error;
  }
};
