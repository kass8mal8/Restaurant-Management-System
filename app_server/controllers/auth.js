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
	const { firstName, lastName, email, password, employeeNumber } = req.body;

	try {
		const user = await User.create({
			email,
			password,
			employeeNumber,
			firstName,
			lastName,
		});

		const token = generateToken({
			name: `${user.firstName} ${user.lastName}`,
			email: user.email,
			employee_number: user.employeeNumber,
		});

		res.cookie("token", token, { httpOnly: true });

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const signin = async (req, res) => {
	const { email, password } = req.body;
	try {
		await User.login(email, password);

		const generatedOTP = generateOTP();

		await User.findOneAndUpdate({ email }, { otp: generatedOTP });

		const mailOptions = {
			from: EMAIL_ADDRESS,
			to: email,
			subject: "Restaurant Management System - OTP Verification", // Subject line
			text: `Your One-Time Password (OTP) is: ${generatedOTP}`, // plain text body
		};

		await transporter.sendMail(mailOptions);

		res.status(200).json({ message: "verify OTP sent to email", generatedOTP });
	} catch (error) {
		res.status(200).json({ message: error.message });
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

		if (otp !== user.otp) {
			return res.status(400).json({ message: "Invalid OTP" });
		}

		await User.findOneAndUpdate({ email }, { otp: null });

		res.cookie("token", token, { httpOnly: true });
		res.status(200).json({ message: "Authenticated successfully" });
	} catch (error) {
		res.status(200).json({ error: error.message });
	}
};

const signout = (req, res) => {
	req.session.destroy();

	res.clearCookie("token");
	res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
	signup,
	signin,
	verifyOTP,
	signout,
};
