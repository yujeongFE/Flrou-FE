import axios from "axios";

export async function UpdatePlanRequest(
  plan_id,
  plan,
  s_year,
  s_month,
  s_day,
  s_hour,
  s_minute,
  f_year,
  f_month,
  f_day,
  f_hour,
  f_minute,
  alarm,
  color,
) {
  try {
    const requestData = {
      plan_id,
      plan,
      s_year,
      s_month,
      s_day,
      s_hour,
      s_minute,
      f_year,
      f_month,
      f_day,
      f_hour,
      f_minute,
      alarm,
      color,
    };

    const response = await axios.post("http://localhost:3000/plan/updatePlan", requestData);
    return response;
  } catch (error) {
    throw new Error("일정 등록에 실패했습니다.");
  }
}
