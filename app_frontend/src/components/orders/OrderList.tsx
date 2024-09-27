// import { ReactNode } from "react";

import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

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
};

type users = {
	_id: string;
	firstName: string;
	lastName: string;
};

const OrderList = ({ data }: OrderProps) => {
	const { data: userData } = useFetch("/auth/users", "users");

	const users = data?.map((item) => {
		const userOne = userData?.user.find(
			(user: users) => user._id === item.userId
		);

		return {
			username: `${userOne?.firstName} ${userOne?.lastName}`,
		};
	});

	console.log("Users:", users);

	return (
		<>
			{data?.map((item, index) => (
				<ul
					key={item._id}
					className="flex justify-between border-b py-2 px-4 hover:bg-gray-100 text-slate-700"
				>
					<li className="border-r pr-8">#{item._id.slice(-5)}</li>
					<li className="text-center border-r pr-8 -ml-12">
						{new Date(item.orderDate).toLocaleDateString("en-US", {
							day: "numeric",
							month: "short",
							year: "numeric",
						})}
					</li>
					<li className="-ml-12">{users[index].username}</li>
					<li
						className={`${
							item.status === "Pending"
								? "bg-orange-100 border-2 text-orange-500 border-orange-300"
								: "bg-green-100  border-green-300 text-green-500"
						} px-3 py-1 rounded text-sm`}
					>
						{item.status}
					</li>
					<li>Ksh {item.totalPrice}</li>
					<li>{item.products.length} Items</li>
					<li>Delete </li>
				</ul>
			))}
		</>
	);
};

export default OrderList;
