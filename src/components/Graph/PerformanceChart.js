import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from "recharts";

const PerformanceChart = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(generateData(props.currentDate, props.currentYear, props.isActive));
  }, [props.currentDate, props.currentYear, props.isActive]);

  const generateData = (currentDate, currentYear, isActive) => {
    let newData = [];

    if (isActive === "month") {
      const startMonth = 1;
      const endMonth = currentDate.getMonth() + 1;
      for (let month = startMonth; month <= endMonth; month++) {
        newData.push({ month: `${month}월`, performance: Math.floor(Math.random() * 100) });
      }
    } else {
      for (let year = currentYear - 1; year <= currentYear; year++) {
        newData.push({ year: `${year}년`, performance: Math.floor(Math.random() * 100) });
      }
    }

    return newData;
  };

  return (
    <div style={{ backgroundColor: "#EDF3FB" }}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid vertical={false} />
          {props.isActive === "month" ? <XAxis dataKey="month" /> : <XAxis dataKey="year" />}
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="performance" stroke="#8884d8" fill="#ECEDFD" />
          <Line type="monotone" dataKey="performance" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
