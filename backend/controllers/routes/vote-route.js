let express = require("express");

const {
  submitVotes,
  getVotesPerCategory,
  getVotesForCategory,
} = require("../controllers/vote-controller");
const router = express.Router();
router.post("/submitVotes", submitVotes);
router.get("/getVotesPerCategory", getVotesPerCategory);
router.get("/getVotesForCategory/:categoryId", getVotesForCategory);

module.exports = router;
