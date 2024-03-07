"use client";

import React from "react";
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from "recharts";

type Props = {
  data: {
    name: string;
    total: number;
  }[];
};

const Chart = ({data}: Props) => {
  return (
    <div>
      <ResponsiveContainer width={"100%"} height={400}>
        <BarChart data={data}>
          <XAxis
            dataKey={"name"}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={true}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={true}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar dataKey={"total"} fill="#0891b2" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
