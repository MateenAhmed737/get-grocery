import React, { useEffect, useState } from "react";
import { base_url } from "../utils/url";
import { Loader, Page } from "../components";
import { dashboardCards } from "../constants/data";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    const url = base_url + "/super-admin-dashboard";

    try {
      const res = await fetch(url);
      const json = await res.json();

      if (json.success) {
        const data = json.success.data;
        console.log("data", data);
        setIsLoading(false);
        setAnalytics(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <Page
      title="Dashboard"
      containerStyles={`relative !bg-[#EEF2F5] !p-0`}
      headerStyles="px-5 !m-0 !py-2 bg-white"
      enableHeader
    >
      {isLoading ? (
        <div className="w-full flex justify-center items-center min-h-[90vh]">
          <Loader extraStyles="!static !bg-transparent" />
        </div>
      ) : (
        <main className="grid grid-cols-2 gap-3 p-8 gap-x-4 sm:gap-x-8">
          <DashboardCards {...{ arr: dashboardCards, analytics }} />
        </main>
      )}
    </Page>
  );
};

const DashboardCards = ({ arr, analytics }) => {
  return arr.map(({ title, icon, colSpan }) => (
    <div
      key={title}
      className={`${colSpan} flex justify-between items-center px-6 py-4 bg-white rounded-xl`}
    >
      <div className="flex items-center">
        {icon}
        <span className="text-xs font-medium text-[#8B8B93] ml-2 capitalize">
          {title === "Total_Sales"
            ? "Total Salers"
            : title.replaceAll("_", " ")}
        </span>
      </div>
      <span className="text-base font-semibold">{analytics[title]}</span>
    </div>
  ));
};

export default Dashboard;
