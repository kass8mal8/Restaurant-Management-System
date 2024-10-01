import React, { useState } from "react";
import search from "../../assets/images/search.png";

type Order = {
	_id: string;
	orderDate: string;
	products: object[];
	totalPrice: number;
	status: string;
	userId: string;
};

type OrderProps = {
	data: Order[];
	setData: (data: Order) => void;
};

const SearchOrder = ({ orderData, setData }: OrderProps) => {
	const [value, setValue] = useState<string>("");

	return (
		<div className="relative">
			<img
				src={search}
				alt="search"
				className="w-4 h-4 absolute left-3 top-3 opacity-60"
			/>
			<input
				type="text"
				name="email"
				placeholder="search"
				value={value}
				onChange={(e: React.ChangeEvent) => setValue(e.target?.value)}
				className="border pl-10 p-2  rounded-lg focus:outline-none"
			/>
		</div>
	);
};

export default SearchOrder;
