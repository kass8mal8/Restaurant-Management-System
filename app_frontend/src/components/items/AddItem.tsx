import React, { useState } from "react";

interface Item {
	title?: string | undefined;
	price?: number | undefined;
	quantity?: number | undefined;
	category?: string | undefined;
}

type AddedItems = {
	items: Item[];
};

const AddItem = () => {
	const [items, setItems] = useState<Item>();
	const [addedItems, setAddedItems] = useState<AddedItems | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setItems({
			...items,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (items) {
			setAddedItems((prevItems) => {
				if (prevItems) {
					return { ...prevItems, items: [...prevItems.items, items] };
				} else {
					return { items: [items] };
				}
			});
		}
	};
	console.log(addedItems);

	return (
		<div className="ml-[17%] mt-[6%] w-[82%] flex space-x-4">
			<form
				className="rounded-md w-[50%] block px-6 py-5 bg-white"
				onSubmit={handleSubmit}
			>
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
					<div className="flex justify-between space-x-4">
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
							className="w-[50%] p-3 rounded border outline-none"
						/>
					</div>
				</section>
				<div className="flex space-x-3 mt-5">
					<select
						className="p-3 w-[50%] bg-white border rounded"
						value={items?.category || ""}
						name="category"
						// onChange={(e) => setItems({ ...items, category: e.target.value })}
					>
						<option value="">Select a category</option>
						<option value="Breakfast">Breakfast</option>
						<option value="Lunch">Lunch</option>
						<option value="Supper">Supper</option>
					</select>
					<button className="p-2 rounded w-full bg-[#8282F2] text-white">
						Add item
					</button>
				</div>
			</form>

			<div className="bg-white p-3 rounded-md w-[47%]">
				Added Items will appear here
			</div>
		</div>
	);
};

export default AddItem;
