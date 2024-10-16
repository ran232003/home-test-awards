import React, { useState } from "react";
import NomineeItem from "./NomineeItem";
import { useDispatch } from "react-redux";
import { voteAction } from "../../store/gameSlice";

export default function NomineeList(props) {
  const { data } = props;

  // State to hold the votes, one per category
  const [votesObject, setVotesObjects] = useState({});
  const [votes, setVotes] = useState([]);
  const dispatch = useDispatch();
  // Handle vote toggle for a specific category
  const handleVoteClick = (categoryId, item) => {
    setVotesObjects((prev) => {
      return { ...prev, [categoryId]: item.title };
    });
    dispatch(voteAction.setVotes({ id: categoryId, item: item }));
    const existingVote = votes.find((vote) => vote.categoryId === categoryId);

    if (existingVote && existingVote.nomineeId === item.id) {
      // If already voted for this nominee, unvote (remove the vote for this category)
      setVotes(votes.filter((vote) => vote.categoryId !== categoryId));
    } else {
      // Update the vote for the current category, leave other categories unchanged
      setVotes([
        ...votes.filter((vote) => vote.categoryId !== categoryId),
        {
          categoryId: categoryId,
          nomineeId: item.id,
          nomineeTitle: item.title,
        },
      ]);
    }
  };

  return (
    <div className="NomineeList-main">
      <div className="category-header">
        <h4>{data.title}</h4>
      </div>
      <div className="NomineeItemContainer">
        {data.items.map((item) => (
          <NomineeItem
            key={item.id}
            id={data.id}
            item={item}
            isVoted={votes.some(
              (vote) =>
                vote.nomineeId === item.id && vote.categoryId === data.id
            )}
            onVoteClick={handleVoteClick} // Pass category ID to vote handler
          />
        ))}
      </div>
    </div>
  );
}
