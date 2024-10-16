let express = require("express");
const { test } = require("../controllers/user-controller");

const router = express.Router();
router.post("/test", test);

module.exports = router;
