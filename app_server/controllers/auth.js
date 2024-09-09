const User = require("../models/authentication");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { SECRET_KEY, EMAIL_ADDRESS, APP_PASSWORD } = process.env;

// nodemailer configuration
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: EMAIL_ADDRESS,
		pass: APP_PASSWORD,
	},
	port: 587,
	secure: false,
});

const generateToken = (payload) => {
	return jwt.sign(payload, SECRET_KEY, {
		expiresIn: "1h",
		algorithm: "HS256",
	});
};

// generate otp

const generateOTP = () => {
	const min = 100000;
	const max = 999999;
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const signup = async (req, res) => {
	console.log(req.body);
	const { firstName, lastName, email, password } = req.body;

	try {
		const user = await User.create({
			email,
			password,
			firstName,
			lastName,
		});

		const token = generateToken({
			first_name: user.firstName,
			last_name: user.lastName,
			email: user.email,
		});

		res.cookie("token", token, { httpOnly: true });

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		res.json({ message: error.message }).status(500);
	}
};

const signin = async (req, res) => {
	const { email, password } = req.body;
	try {
		await User.login(email, password);

		const generatedOTP = generateOTP();
		req.session.otp = generatedOTP;

		const mailOptions = {
			from: EMAIL_ADDRESS, // sender address
			to: email, // receiver address
			subject: "Restaurant Management System - OTP Verification", // Subject line
			text: `Your One-Time Password (OTP) is: ${generatedOTP}`, // plain text body
		};

		await transporter.sendMail(mailOptions);

		res.json({ message: "verify OTP sent to email", generatedOTP }).status(200);
	} catch (error) {
		res.json({ message: error.message }).status(401);
	}
};

const verifyOTP = async (req, res) => {
	const { otp, email } = req.body;

	try {
		const user = await User.findOne({ email });
		const token = generateToken({
			first_name: user.firstName,
			last_name: user.lastName,
			email: user.email,
		});

		if (otp !== req.session.otp) {
			return res.status(400).json({ message: "Invalid OTP" });
		}

		res.cookie("token", token, { httpOnly: true });
		res.json({ message: "Authenticated successfully" }).status(200);
	} catch (error) {
		res.json({ error: error.message }).status(401);
	}
};

const signout = (req, res) => {
	req.session.destroy();

	res.clearCookie("token");
	res.json({ message: "Logged out successfully" }).status(200);
};

module.exports = {
	signup,
	signin,
	verifyOTP,
	signout,
};
