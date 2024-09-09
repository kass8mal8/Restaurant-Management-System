import Introduction from "./Introduction";
import usePost from "../../hooks/usePost";
import React, { useState, useRef, useEffect } from "react";
import Otp from "./Otp";

type UserDetails = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

const Signin: React.FC = () => {
	const [userDetails, setUserDetails] = useState<UserDetails>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserDetails({
			...userDetails,
			[e.target.name]: e.target.value,
		});
	};

	const url: string = "http://localhost:5000/api/auth/signin";
	const { post, loading } = usePost(url);
	// const navigate = useNavigate();
	const modalRef = useRef<HTMLDialogElement>();
	const [isOpen, setIsOpen] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await post(userDetails);
			setIsOpen(true);
		} catch (error) {
			console.log(error);
		}
	};

	const handleClose = (e: React.MouseEvent<HTMLDialogElement>) => {
		const dimensions = modalRef.current?.getBoundingClientRect();
		if (dimensions) {
			if (
				e.clientX < dimensions.left ||
				e.clientX > dimensions.right ||
				e.clientY < dimensions.top ||
				e.clientY > dimensions.bottom
			) {
				setIsOpen(false);
				modalRef.current?.close();
			}
		}
	};

	useEffect(() => {
		if (isOpen) modalRef.current?.showModal();
	}, [isOpen]);

	return (
		<>
			<div className=" justify-between items-center mt-28 mx-auto w-1/3 p-4 bg-white rounded-lg">
				<Introduction />
				<form className="px-4 py-8" onSubmit={handleSubmit}>
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
						disabled={loading}
					>
						{loading ? "processing..." : "submit"}
					</button>
				</form>
			</div>
			<dialog
				ref={modalRef as React.RefObject<HTMLDialogElement>}
				onClick={handleClose}
				className="border p-0 -mb-4 md:mb-auto py-5 px-6 w-full md:w-1/3 rounded-2xl max-w-[50ch] backdrop:opacity-50 backdrop:bg-black"
			>
				<Otp email={userDetails?.email} />
			</dialog>
		</>
	);
};

export default Signin;
