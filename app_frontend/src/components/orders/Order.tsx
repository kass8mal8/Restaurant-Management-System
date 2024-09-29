import OrderList from "./OrderList";
import useFetch from "../../hooks/useFetch";
import OrderHeader from "./OrderHeader";
import { useEffect, useState } from "react";

const Order = () => {
	const { data } = useFetch("/orders", "orders");
	const [orderData, setOrderData] = useState(data);
	const [status, setStatus] = useState<string>("");

	const statuses = ["Pending", "Completed"];
	useEffect(() => {
		if (statuses.includes(status)) {
			const index = statuses.indexOf(status);
			const orders = data?.filter(
				(order: { status: string }) => order.status === statuses[index]
			);
			setOrderData(orders);
		} else {
			setOrderData(data);
		}
	}, [data, status]);

	return (
		<div className="ml-[17%] mt-[6%] w-[82%]">
			<OrderHeader data={data} />
			<ul className="flex space-x-4 items-center bg-gray-200 w-[22%] my-2 rounded-lg p-1 opacity-75">
				<li
					onClick={() => setStatus("All")}
					className={`${
						!statuses.includes(status) && "bg-white px-4 py-1 rounded"
					} cursor-pointer`}
				>
					All
				</li>
				<li
					onClick={() => setStatus("Pending")}
					className={`${
						statuses[0] === status && "bg-white px-4 py-1 rounded"
					} cursor-pointer`}
				>
					Pending
				</li>
				<li
					onClick={() => setStatus("Completed")}
					className={`${
						statuses[1] === status && "bg-white px-4 py-1 rounded"
					} cursor-pointer`}
				>
					Completed
				</li>
			</ul>

			<div className="border rounded mt-2">
				<ul className="flex justify-between bg-gray-200 py-2 px-4 rounded-t mb-2 opacity-60 font-semibold">
					<li>Order</li>
					<li>Date</li>
					<li>Customer</li>
					<li>Status</li>
					<li>Total</li>
					<li>Items</li>
					<li>Actions</li>
				</ul>

				<OrderList data={orderData} />
			</div>
		</div>
	);
};

export default Order;
