import React, { useEffect, useState } from "react";
import search from "../../assets/images/search.png";
import Order from "./Order";

type Order = {
	_id: string;
	orderDate: string;
	products: object[];
	totalPrice: number;
	status: string;
	userId: string;
	telephone: string;
};

type OrderProps = {
	data: Order[];
	setData: (data: Order[]) => void;
};

const SearchOrder = ({ data, setData }: OrderProps) => {
	const [telephone, setTelephone] = useState<string>("");
	const [tempOrders] = useState(data);

	useEffect(() => {
		const orders = tempOrders?.filter((order: { telephone: string }) => {
			if (order.telephone.includes(telephone)) return order;
		});
		setData(orders);
	}, [telephone, tempOrders, setData]);

	return (
		<div className="relative">
			<img
				src={search}
				alt="search"
				className="w-4 h-4 absolute left-3 top-3 opacity-60"
			/>
			<input
				type="text"
				placeholder="search phone number"
				name="telephone"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setTelephone(e.target.value)
				}
				className="border pl-10 p-2  rounded-lg focus:outline-none"
			/>
		</div>
	);
};

export default SearchOrder;
