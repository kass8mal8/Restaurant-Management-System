import OrderList from "./OrderList";
import useFetch from "../../hooks/useFetch";
import OrderHeader from "./OrderHeader";

const Order = () => {
	const { data } = useFetch("/orders", "orders");
	return (
		<div className="ml-[17%] mt-[7%] w-[82%]">
			<OrderHeader data={data} />

			<ul className="flex justify-between bg-gray-200 py-2 px-4 rounded mt-2 opacity-60 font-semibold">
				<li>Order</li>
				<li>Date</li>
				<li>Customer</li>
				<li>Status</li>
				<li>Total</li>
				<li>Items</li>
			</ul>
			<OrderList data={data} />
		</div>
	);
};

export default Order;
