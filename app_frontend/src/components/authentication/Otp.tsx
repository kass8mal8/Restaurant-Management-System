import { useEffect, useState, FC } from "react";
import usePost from "../hooks/usePost";
import { useNavigate } from "react-router-dom";

type OtpProps = {
	email: string;
};

const Otp: FC<OtpProps> = ({ email }) => {
	const [otpCode, setOtpCode] = useState<string[]>(Array(6).fill(""));
	const [isComplete, setIsComplete] = useState(false);
	const url = "http://localhost:5000/api/auth/verify_otp";
	const { post, loading } = usePost(url);
	const navigate = useNavigate();

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

	const otp = otpCode.join("");

	const handleSubmit = async () => {
		try {
			await post({ otp, email });
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};
	const [encryptedEmail, setEncryptedEmail] = useState<string | null>(null);

	useEffect(() => {
		if (email.length) {
			const stars = Math.max(0, email.length - (email.indexOf("@") + 2)); // Ensure non-negative

			// format of email will be u***30@gmail.com
			setEncryptedEmail(
				email[0] +
					Array(stars).fill("*").join("") +
					email.slice(email.indexOf("@") - 2, email.length)
			);
		}
	}, [email]);

	return (
		<div className="bg-white px-6 py-7 mx-auto w-full rounded-lg">
			<h2 className="text-3xl mb-2 font-bold text-gray-600">
				OTP Verification
			</h2>
			<p className="mb-6 text-gray-600">
				Enter the code that was sent to your email {encryptedEmail}
			</p>
			<form className="flex space-x-4 justify-center w-full">
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
			</form>

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
