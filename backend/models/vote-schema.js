const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voteSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user
  votes: [
    {
      categoryId: { type: String, required: true }, // Category, e.g., 'bestpicture', 'bestdirector'
      movieId: { type: String, required: true }, // Movie ID, e.g., 'the-trial-of-the-chicago-7'
      movieTitle: { type: String, required: true }, // Movie title
      photoUrL: { type: String, required: true }, // URL of the movie poster
    },
  ],
});

const UserVote = mongoose.model("UserVote", voteSchema);
module.exports = UserVote;
