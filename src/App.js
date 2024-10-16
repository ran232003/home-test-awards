import logo from "./logo.svg";
import "./App.css";
import Homepage from "./homePage/Homepage";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { voteAction } from "./store/gameSlice";
import { items } from "./data";
import NavigationBar from "./global/NavigationBar";
import Dashboard from "./dashboard/Dashboard";
import DashboardContent from "./dashboard/components/DashboardContent";
import CategoryTemplate from "./dashboard/components/CategoryTemplate";

function App() {
  const dispatch = useDispatch();
  const setData = () => {
    dispatch(voteAction.setData(items));
  };
  useEffect(() => {
    setData();
  }, []);
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashBoard" element={<Dashboard />} />
        <Route path="/dashboard/dashTemplate" element={<CategoryTemplate />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
