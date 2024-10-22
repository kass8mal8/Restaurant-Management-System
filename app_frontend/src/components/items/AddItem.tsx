import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import usePost from "../../hooks/usePost";
import { isAxiosError } from "axios";

interface Item {
	title?: string | undefined;
	price?: number | undefined;
	quantity?: number | undefined;
	category?: string | undefined;
}

const AddItem = () => {
	const { user } = useAuthContext();
	const [items, setItems] = useState<Item>();
	const { post } = usePost(`/items/create/${user?.id}`);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setItems({
			...items,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!items) return;

		try {
			const res = await post(items);
			console.log(res);
		} catch (error) {
			if (isAxiosError(error)) {
				console.log(error.message);
			}
		}
	};

	return (
		<form className="rounded-md block w-full  bg-white" onSubmit={handleSubmit}>
			<label htmlFor="product name" className="mb-3">
				Product name
			</label>
			<input
				type="text"
				placeholder="product name"
				name="title"
				onChange={handleChange}
				className="w-full mt-2 block p-3 rounded outline-none border"
			/>
			<section className=" my-5 ">
				<div className="flex justify-between">
					<label htmlFor="product price" className="mb-3">
						Product price
					</label>
					<label htmlFor="product quantity" className="mb-3 mr-10">
						Product quantity
					</label>
				</div>
				<div className=" w-32">
					<input
						type="text"
						placeholder="30"
						name="price"
						onChange={handleChange}
						className="rounded p-3 border outline-none block"
					/>

					<input
						type="text"
						placeholder="12"
						name="quantity"
						onChange={handleChange}
						className=" p-3 rounded border outline-none"
					/>
				</div>
			</section>
			<div className="flex space-x-3 mt-5">
				<select
					className="p-3 w-[50%] bg-white border rounded"
					value={items?.category || ""}
					name="category"
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
						setItems({ ...items, category: e.target.value })
					}
				>
					<option value="">Select a category</option>
					<option value="breakfast">Breakfast</option>
					<option value="lunch">Lunch</option>
					<option value="supper">Supper</option>
				</select>
				<button
					className="p-2 rounded w-full bg-[#8282F2] text-white"
					type="submit"
					formMethod="dialog"
				>
					Add item
				</button>
			</div>
		</form>
	);
};

export default AddItem;
