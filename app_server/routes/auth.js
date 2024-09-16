const { Router } = require("express");
const {
	signup,
	signin,
	verifyOTP,
	signout,
	getUser,
} = require("../controllers/auth");
const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/verify_otp", verifyOTP);
router.post("/signout", signout);
router.get("/profile", getUser);

module.exports = router;
