import React, { useEffect, useState } from "react";
import MySideBar from "./components/MySideBar";
import DashboardContent from "./components/DashboardContent";
import "./Dashboard.css";
import { useLocation } from "react-router-dom";
import CategoryTemplate from "./components/CategoryTemplate";
function Dashboard(props) {
  const [tab, setTab] = useState("");
  const location = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      setTab(""); // default to empty string if no tab is specified
    }
  }, [location.search]);
  console.log(tab, "tab");
  return (
    <div className="mainDashboard">
      <MySideBar />
      {tab === "dash" || tab === "" ? (
        <DashboardContent />
      ) : (
        <CategoryTemplate tab={tab} />
      )}
    </div>
  );
}

export default Dashboard;
