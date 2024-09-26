import OrderList from "./OrderList";
import useFetch from "../../hooks/useFetch";
import OrderHeader from "./OrderHeader";

const Order = () => {
	const { data, isLoading, error } = useFetch("/orders", "orders");
	return (
		<div className="ml-[17%] mt-[7%] w-[82%]">
			<OrderHeader data={data} />
			<OrderList data={data} />
		</div>
	);
};

export default Order;
