import React, { useState } from "react";
import usePost from "../../hooks/usePost";

type emailProps = {
	email: string;
};

const Otp: React.FC<emailProps> = ({ email }) => {
	const [otpCode, setOtpCode] = useState<string[]>(Array(6).fill(""));
	const [isComplete, setIsComplete] = useState<boolean>(false);
	const url = "http://localhost:5000/api/auth/verify_otp";
	const { post, loading } = usePost(url);

	const handleChange = (index: number, value: string) => {
		const updatedOtp = [...otpCode];
		updatedOtp[index] = value;
		setOtpCode(updatedOtp);

		if (value !== "" && index < 5) {
			const nextInput = document.getElementById(
				`otp-${index + 1}`
			) as HTMLInputElement;
			nextInput?.focus();
		}
		if (index === 5) setIsComplete(true);
	};

	const otp = +otpCode.join("");
	console.log(typeof otpCode);

	const handleSubmit = async () => {
		try {
			await post({ otp, email });
		} catch (error) {
			console.log(error);
		}
	};

	const stars = email.length - (email.indexOf("@") + 2);

	// format of email will be u***30@gmail.com
	const encryptedEmail =
		email[0] +
		Array(stars).fill("*").join("") +
		email.slice(email.indexOf("@") - 2, email.length);

	return (
		<div className="bg-white px-6 py-7 mx-auto w-full rounded-lg">
			<h2 className="text-3xl mb-2 font-bold text-gray-600">
				OTP Verification
			</h2>
			<p className="mb-6 text-gray-600">
				Enter the code that was sent to {encryptedEmail}
			</p>
			<div className="flex space-x-4 justify-center w-full">
				{otpCode.map((code, index) => (
					<input
						key={index}
						id={`otp-${index}`}
						type="text"
						value={code}
						maxLength={1}
						className="w-12 h-12 rounded border border-gray-300 text-center"
						onChange={(e) => handleChange(index, e.target.value)}
					/>
				))}
			</div>

			<div className="mt-5  w-full">
				<button
					className={`${
						loading ? "bg-gray-300" : "bg-[#6163EF]"
					} w-full text-white p-3 rounded-lg`}
					disabled={!isComplete}
					onClick={handleSubmit}
				>
					{loading ? "verifying..." : "verify email"}
				</button>
			</div>
		</div>
	);
};

export default Otp;
