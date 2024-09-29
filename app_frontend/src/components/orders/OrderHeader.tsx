import Order from "./Order";
import moment from "moment";

type Order = {
	_id: string;
	orderDate: string;
	products: {
		productName: string;
		productPrice: number;
		productQuantity: number;
	}[];
	totalPrice: number;
	status: string;
	userId: string;
};

type OrderProps = {
	data: Order[];
};

const OrderHeader = ({ data }: OrderProps) => {
	const items = data?.map((item) => item.products);
	const totalQuantity = items?.map((item) => item.length);

	const totalProductQuantity = totalQuantity?.reduce((a, b) => a + b, 0);

	const completedOrders = data?.filter((item) => item.status !== "Pending");

	// Get orders for last week
	const lastWeekOrders = data?.filter((item) =>
		moment(item.orderDate).isBetween(
			moment().subtract(1, "week"),
			moment().startOf("week"),
			null,
			"[]"
		)
	);

	// Get orders for this week
	const thisWeekOrders = data?.filter((item) =>
		moment(item.orderDate).isBetween(
			moment().startOf("week"),
			moment(),
			null,
			"[]"
		)
	);

	const thisWeekItems = thisWeekOrders?.map((item) => item.products);
	const lastWeekItems = lastWeekOrders?.map((item) => item.products);
	const itemsDiff =
		thisWeekItems && lastWeekItems
			? thisWeekItems[0]?.length - lastWeekItems[0]?.length
			: 0;

	const itemsDivisor =
		itemsDiff > 0
			? itemsDiff / totalProductQuantity
			: Math.abs(itemsDiff) / totalProductQuantity;
	const itemsPercentage = (itemsDivisor * 100).toFixed(2);

	const orderDiff = thisWeekOrders?.length - lastWeekOrders?.length;
	console.log("Last week", lastWeekOrders);
	const orderDivisor =
		orderDiff > 0
			? orderDiff / data?.length
			: Math.abs(orderDiff) / data?.length;
	const percentage = (orderDivisor * 100).toFixed(2);

	return (
		<div className="flex justify-between">
			<div className="py-2 px-4 rounded-lg border w-[30%]">
				<p className="text-gray-600">Total orders </p>
				<p className="text-3xl font-bold my-2 text-gray-600">
					{data?.length} -{" "}
				</p>
				<p className={`${itemsDiff > 0 ? "text-green-300" : "text-red-300"} `}>
					{orderDiff > 0 ? `+${percentage}` : `-${percentage}`}% Last week
				</p>
			</div>
			<div className="py-2 px-4 rounded-lg border w-[30%]">
				<p className="text-gray-600">Order Items over time </p>
				<p className="text-3xl font-bold my-2 text-gray-600">
					{totalProductQuantity} -{" "}
				</p>
				<p className={`${itemsDiff > 0 ? "text-green-300" : "text-red-300"} `}>
					{itemsDiff > 0 ? `+${itemsPercentage}` : `-${itemsPercentage}`}% Last
					week
				</p>
			</div>
			<div className="py-2 px-4 rounded-lg border w-[30%]">
				<p className="text-gray-600">Completed Orders </p>
				<p className="text-3xl font-bold my-2 text-gray-600">
					{completedOrders?.length} -{" "}
				</p>
			</div>
		</div>
	);
};

export default OrderHeader;
