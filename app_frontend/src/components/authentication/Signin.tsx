import Introduction from "./Introduction";
import usePost from "../hooks/usePost";
import { useState, useRef, useEffect, FC } from "react";
import Otp from "./Otp";

type User = {
	email: string;
	password: string;
};

const Signin: FC = () => {
	const url: string = "http://localhost:5000/api/auth/signin";
	const { post, loading } = usePost(url);
	const modalRef = useRef<HTMLDialogElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const [userDetails, setUserDetails] = useState<User>({
		email: "",
		password: "",
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserDetails({
			...userDetails,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await post(userDetails);
			setIsOpen(true);
		} catch (error) {
			setError(
				error instanceof Error ? error : new Error("An unknown error occurred")
			);
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

	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	useEffect(() => {
		if (isOpen) modalRef.current?.showModal();
		setIsDisabled(
			(Object.values(userDetails)[0] || Object.values(userDetails)[1]) === ""
		);
	}, [isOpen, userDetails]);

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
						className="border mb-4 p-3 rounded-lg w-full focus:outline-none"
					/>
					<input
						type="password"
						name="password"
						placeholder="password"
						onChange={handleChange}
						className="border focus:outline-none mb-4 p-3 rounded-lg w-full"
					/>
					<p className="text-red-500 my-2">
						{error?.message.includes("smtp.gmail.com")
							? "Network error"
							: error?.message}
					</p>
					<button
						type="submit"
						className={`${
							loading ? "bg-gray-300" : "bg-[#6163EF]"
						} p-3  w-full text-white rounded-lg`}
						disabled={loading || isDisabled}
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
