import OrderList from "./OrderList";
import useFetch from "../../hooks/useFetch";
import OrderHeader from "./OrderHeader";
import { useEffect, useState } from "react";
import OrderSort from "./OrderSort";
import { useAuthContext } from "../../context/AuthContext";

const Order = () => {
	const { user } = useAuthContext();
	const { data } = useFetch(`/orders/${user?.id}`, "orders");
	const [orderData, setOrderData] = useState(data);
	const [status, setStatus] = useState<string>("");

	const statuses = ["Pending", "Completed"];

	// Filter the orders according to their status i.e pending or completed
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
			<OrderHeader data={(typeof orderData !== "string" && orderData) || []} />
			<OrderSort
				setStatus={setStatus}
				statuses={statuses}
				status={status}
				data={(typeof orderData !== "string" && orderData) || []}
				setData={setOrderData}
			/>

			<div className="border rounded mt-2">
				<ul className="flex justify-between bg-gray-200 py-2 px-4 rounded-t mb-2 opacity-60 font-semibold">
					<li>Order Id</li>
					<li>Date</li>
					<li>Telephone</li>
					<li>Status</li>
					<li>Total</li>
					<li>Items</li>
					<li className="w-[50px]"></li>
				</ul>

				<OrderList data={(typeof orderData !== "string" && orderData) || []} />
			</div>
		</div>
	);
};

export default Order;
