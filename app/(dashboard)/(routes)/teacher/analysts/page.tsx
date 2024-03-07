import {getAnalytics} from "@/actions/get-analysts";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import React from "react";
import DataCard from "./_components/DataCard";
import Chart from "./_components/Chart";

type Props = {};

const Analysts = async (props: Props) => {
  const {userId} = auth();

  if (!userId) {
    redirect("/");
  }

  const {data, totalRevenue, totalSales} = await getAnalytics(userId);

  return (
    <div className="p-6 flex flex-col gap-10 md:gap-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <DataCard label="Total courses sold" value={totalSales} />
        <DataCard label="Total revenue" value={totalRevenue} isFormat />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default Analysts;
