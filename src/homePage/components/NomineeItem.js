import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function NomineeItem({ id, item, isVoted, onVoteClick }) {
  const handleClick = () => {
    onVoteClick(id, item);
  };
  return (
    <Card
      className="item-main"
      style={{
        width: "18rem",
        border: isVoted ? "3px solid gold" : "1px solid #ddd", // Highlight if selected
        boxShadow: isVoted ? "0 0 10px rgba(0, 0, 0, 0.5)" : "none", // Optional: Add a shadow for effect
      }}
    >
      <Card.Img
        variant="top"
        src={item.photoUrL}
        style={{ height: "400px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
        <Button variant="primary" onClick={handleClick}>
          {isVoted ? "Voted" : "Vote"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default NomineeItem;
