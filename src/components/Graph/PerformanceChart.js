import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from "recharts";

class MonthlyPerformanceChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.generateData(),
    };
  }

  generateData() {
    // 랜덤한 월별 성과 생성 (임시)
    return Array.from({ length: 12 }, (_, index) => ({ month: `${index + 1}월`, performance: Math.floor(Math.random() * 100) }));
  }

  render() {
    return (
      <div style={{ backgroundColor: "#EDF3FB"}}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={this.state.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="performance" stroke="#8884d8" fill="#ECEDFD" />
            <Line type="monotone" dataKey="performance" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 8 }} /> {/* 수정된 부분 */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default MonthlyPerformanceChart;
