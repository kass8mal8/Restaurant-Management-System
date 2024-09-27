import OrderList from "./OrderList";
import useFetch from "../../hooks/useFetch";
import OrderHeader from "./OrderHeader";

const Order = () => {
	const { data } = useFetch("/orders", "orders");
	return (
		<div className="ml-[17%] mt-[7%] w-[82%]">
			<OrderHeader data={data} />

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
				<OrderList data={data} />
			</div>
		</div>
	);
};

export default Order;
