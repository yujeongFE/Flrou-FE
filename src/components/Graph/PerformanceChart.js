import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const PerformanceChart = ({ isActive, successCount, currentYear }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const generateData = () => {
      if (successCount && successCount.length > 0) {
        let newData = [];

        if (isActive === "month") {
          successCount.forEach((count, index) => {
            const total = count[0] + count[1];
            const completionRate = total === 0 ? 0 : Math.round((count[0] / total) * 100);
            newData.push({ month: `${index + 1}월`, 완수율: completionRate });
          });
        } else {
          let total = 0;
          let completionRate = 0;
          for (let i = successCount.length - 1; i >= 0; i--) {
            total += successCount[i][0] + successCount[i][1];
            completionRate += total === 0 ? 0 : Math.round((successCount[i][0] / total) * 100);
          }
          newData.push({ month: `${currentYear}년`, 완수율: completionRate });
        }
        setData(newData);
      }
    };

    generateData();
  }, [isActive, successCount]);

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `${value}%`} />
          <Bar dataKey="완수율" fill="#63A1FD" barSize={30} />
          <ReferenceLine y={50} stroke="#FFC2C2" strokeWidth={2} label={{ value: "50%", position: "right", dy: -5 }} />
          {isActive !== "month" && <ReferenceLine x={data.length - 1} stroke="gray" strokeWidth={2} />}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
