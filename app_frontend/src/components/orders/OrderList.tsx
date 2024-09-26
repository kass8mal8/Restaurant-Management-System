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

// type users = {
// 	users: [];
// };

const OrderList = ({ data }: OrderProps) => {
	// const { data: userData } = useFetch("/auth/users", "users");

	// const [users, setUsers] = useState<users | null>(null);

	// useEffect(() => {
	// 	data?.forEach((item) => {
	// 		const users = userData?.user.filter((user) => user._id === item.userId);
	// 		console.log("Users:", users);
	// 		setUsers((prevUsers) => users, ...prevUsers );
	// 	});
	// }, [data, userData]);

	return (
		<>
			{data?.map((item) => (
				<div
					key={item._id}
					className="flex justify-between mt-2 border-b py-2 px-4 hover:bg-gray-100"
				>
					<p>{item._id.slice(-5)}</p>
					<p>
						{new Date(item.orderDate).toLocaleDateString("en-US", {
							day: "numeric",
							month: "short",
							year: "numeric",
						})}
					</p>
					<p>{"John Doe"}</p>
					<p
						className={`${
							item.status === "Pending"
								? "bg-orange-100 border-2 text-orange-500 border-orange-300"
								: "bg-green-100  border-green-300 text-green-500"
						} px-3 py-1 rounded text-sm`}
					>
						{item.status}
					</p>
					<p>Ksh {item.totalPrice}</p>
					<p>{item.products.length}</p>
				</div>
			))}
		</>
	);
};

export default OrderList;
