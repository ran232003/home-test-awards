import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { dummyData } from "../../data";
import { useApiHelper } from "../../global/apiHelper";
import { CATEGORY_DATA } from "../../URLS";

function CategoryTemplate(props) {
  const [movieData, setMovieData] = useState([]);
  const { handleApiCall } = useApiHelper();

  const { tab } = props;
  const getCategoryData = () => {
    const url = CATEGORY_DATA + tab;
    handleApiCall(
      "GET",
      url,
      {},
      (data) => {
        console.log(data);
        setMovieData(data.results);
      },
      () => {}
    );
  };

  console.log(tab, "tab");
  useEffect(() => {
    getCategoryData();
  }, [tab]);
  return (
    <div className="main-template">
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>{tab}</h2>
      <ResponsiveContainer width="90%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={movieData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="movieTitle"
            scale="point"
            padding={{ left: 10, right: 10 }}
            tick={{ dx: -10, dy: 10 }}
            interval={0} // Show all labels
            tickFormatter={(label) => {
              const parts = label.split(" for"); // Split the label by the word "for"
              return parts[0]; // Return the first part (before "for")
            }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            dataKey="voteCount"
            fill="#8884d8"
            background={{ fill: "#eee" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryTemplate;
