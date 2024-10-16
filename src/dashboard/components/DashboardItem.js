import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
function DashboardItem(props) {
  const { voteObject } = props;
  const navigate = useNavigate(); // Hook for navigation

  const handleClick = () => {
    navigate(`/dashboard?tab=${voteObject.category}`);
  };
  return (
    <Card onClick={handleClick} style={{ width: "18rem" }} className="cardItem">
      <Card.Img variant="top" src={voteObject.photoUrL} />
      <Card.Body>
        <Card.Title>{voteObject.category}</Card.Title>
        <Card.Title>{voteObject.title}</Card.Title>
        <Card.Text>Votes: {voteObject.voteCount}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default DashboardItem;
