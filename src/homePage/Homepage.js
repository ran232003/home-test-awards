import React from "react";
import "./HomePage.css";
import NomineeList from "./components/NomineeList";
import { items } from "../data";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useApiHelper } from "../global/apiHelper";
import { SUBMIT_VOTES } from "../URLS";
function Homepage(props) {
  const { handleApiCall } = useApiHelper();

  const data = useSelector((state) => {
    return state.vote;
  });
  const handleSubmit = () => {
    console.log(data.votes, "votes");
    let obj = {
      ...data.votes,
      userName: "userTwo",
      userId: "66f51e86c8986ad1c15a7534",
    };
    handleApiCall(
      "POST",
      SUBMIT_VOTES,
      data.votes,
      (data) => {},
      () => {}
    );
  };

  return (
    <div className="main-home">
      <div className="home-header">
        <h2 className="myH2">Awards 2024</h2>
      </div>
      <div className="list-container">
        {data.data.map((item) => {
          return <NomineeList data={item} />;
        })}
      </div>
      <div>
        <Button onClick={handleSubmit}>Submit Ballot</Button>
      </div>
    </div>
  );
}

export default Homepage;
