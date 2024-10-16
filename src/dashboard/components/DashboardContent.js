import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { categories } from "../../data";
import { useApiHelper } from "../../global/apiHelper";
import { CATEGORY_VOTES } from "../../URLS";
import DashboardItem from "./DashboardItem";
const leadingMovies = {
  "Best Picture": { title: "Movie X", votes: 9 },
  "Best Director": { title: "Director Y", votes: 12 },
  "Best Actor": { title: "Actor Z", votes: 10 },
  "Best Actress": { title: "Actress A", votes: 11 },
  "Best Supporting Actor": { title: "Actor B", votes: 8 },
  "Best Visual Effects": { title: "Movie VFX", votes: 15 },
};

function DashboardContent(props) {
  const { handleApiCall } = useApiHelper();
  const [votes, setVotes] = useState([]);
  const navigate = useNavigate();
  const handleClick = (category) => {
    console.log(category, "handleClick");
    navigate("/dashboard/dashTemplate", { state: { category: category } });
  };
  const getData = async () => {
    handleApiCall(
      "GET",
      CATEGORY_VOTES,
      {},
      (data) => {
        console.log(data);
        setVotes(data.data);
      },
      () => {}
    );
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div
      style={{
        flexGrow: 1,
        padding: "20px",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <div></div>
      {votes.map((voteObject, index) => (
        <DashboardItem voteObject={voteObject} />
        // <div
        //   className="category-div"
        //   key={index}
        //   onClick={() => handleClick(voteObject.category)}
        // >
        //   <h3>{voteObject.category}</h3>
        //   <p>
        //     <strong>Movie:</strong> {voteObject.title}
        //   </p>
        //   <p>
        //     <strong>Votes:</strong> {voteObject.voteCount}
        //   </p>
        // </div>
      ))}
    </div>
  );
}

export default DashboardContent;
