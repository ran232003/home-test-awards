const MyError = require("../models/MyError");
const UserVote = require("../models/vote-schema");

const getVotesPerCategory = async (req, res, next) => {
  console.log("getVotesPerCategory");
  try {
    const voteCounts = await UserVote.aggregate([
      // Unwind the votes array to have one document per vote
      { $unwind: "$votes" },

      // Group by categoryId and movieTitle, and count the number of votes
      {
        $group: {
          _id: {
            category: "$votes.categoryId",
            title: "$votes.movieTitle",
            photoUrL: "$votes.photoUrL", // Include photoUrl in the group
          },
          voteCount: { $sum: 1 },
        },
      },

      // Sort by voteCount in descending order for each category
      {
        $sort: {
          "_id.category": 1, // First sort by category to group similar categories together
          voteCount: -1, // Then sort by vote count in descending order
        },
      },

      // Group by categoryId, keeping only the movie with the highest vote count
      {
        $group: {
          _id: "$_id.category",
          title: { $first: "$_id.title" },
          photoUrL: { $first: "$_id.photoUrL" }, // Get the first photoUrl for the leading movie
          voteCount: { $first: "$voteCount" },
        },
      },

      // Project the result in the desired format
      {
        $project: {
          _id: 0,
          category: "$_id",
          title: "$title",
          photoUrL: "$photoUrL", // Include photoUrl in the final output
          voteCount: "$voteCount",
        },
      },
    ]);

    return res.json({ status: "ok", data: voteCounts });
  } catch (error) {
    console.error(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
const submitVotes = async (req, res, next) => {
  let { userId, userName, ...categories } = req.body; // Destructure userId and categories
  console.log(req.body);
  console.log("categories", categories);
  userId = "66f51e86c8986ad1c15a753a";
  try {
    // Iterate over the categories to insert or update each vote
    const voteArray = Object.keys(categories).map((categoryKey) => ({
      categoryId: categoryKey,
      movieId: categories[categoryKey].id,
      movieTitle: categories[categoryKey].title,
      photoUrL: categories[categoryKey].photoUrL,
    }));
    console.log(voteArray);

    // Find existing user votes and update or insert new votes
    await UserVote.findOneAndUpdate(
      { userId: userId }, // Find by userId
      { $set: { votes: voteArray } }, // Update the votes array for this user
      { upsert: true, new: true } // Create new entry if user doesn't exist (upsert)
    );

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);

    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
const getVotesForCategory = async (req, res, next) => {
  //let categoryId = "best-visual-effects";
  let categoryId = req.params.categoryId;
  console.log(categoryId, "getVotesForCategory");
  try {
    const results = await UserVote.aggregate([
      { $unwind: "$votes" }, // Deconstruct the votes array
      { $match: { "votes.categoryId": categoryId } }, // Filter by category
      {
        $group: {
          _id: "$votes.movieTitle", // Group by movieTitle
          voteCount: { $sum: 1 }, // Count the number of votes
        },
      },
      {
        $project: {
          movieTitle: "$_id", // Set movieTitle to the grouped movieTitle
          voteCount: 1, // Include voteCount in the output
          _id: 0, // Exclude _id from the output
        },
      },
    ]);
    console.log(results, "results");
    return res.json({ status: "ok", results });
  } catch (error) {
    console.log(error);

    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
module.exports = {
  getVotesPerCategory,
  submitVotes,
  getVotesForCategory,
};
