import { Link, useNavigate } from "react-router-dom";
import Introduction from "./Introduction";
import { useState, FC } from "react";
import usePost from "../hooks/usePost";

type UserDetails = object;

const Signup: FC = () => {
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserDetails({
			...userDetails,
			[e.target.name]: e.target.value,
		});
	};
	const navigate = useNavigate();

	const url: string = "http://localhost:5000/api/auth/signup";
	const { post, loading } = usePost(url);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await post(userDetails);
			navigate("/signin");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className=" justify-between items-center mt-28 mx-auto w-1/3 p-4 bg-white rounded-lg">
			<Introduction />
			<form className="p-4" onSubmit={handleSubmit}>
				<div className="flex space-x-3 w-full">
					<input
						type="text"
						name="firstName"
						placeholder="first name"
						onChange={handleChange}
						className="border mb-4  p-3 rounded-lg w-full"
					/>
					<input
						type="text"
						name="lastName"
						placeholder="last name"
						onChange={handleChange}
						className="border mb-4 p-3 rounded-lg w-full"
					/>
				</div>
				<input
					type="text"
					name="email"
					placeholder="email"
					onChange={handleChange}
					className="border mb-4 p-3 rounded-lg w-full"
				/>
				<input
					type="password"
					name="password"
					placeholder="password"
					onChange={handleChange}
					className="border mb-4 p-3 rounded-lg w-full"
				/>
				<button
					type="submit"
					className={`${
						loading ? "bg-gray-300" : "bg-[#6163EF]"
					} p-3  w-full text-white rounded-lg`}
				>
					{loading ? "processing..." : "submit"}
				</button>
			</form>
			<p className="mt-3 ml-4 text-gray-400">
				Already have an account? <Link to="/signin">Signin</Link>
			</p>
		</div>
	);
};

export default Signup;
