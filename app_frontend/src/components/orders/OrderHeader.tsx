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
	const items = data.length > 0 ? data?.map((item) => item.products) : [];
	const totalQuantity = items?.map((item) => item.length);

	const totalProductQuantity = totalQuantity?.reduce((a, b) => a + b, 0);

	const completedOrders =
		data.length > 0 ? data?.filter((item) => item.status !== "Pending") : [];

	// Get orders for last week
	const lastWeekOrders =
		data.length > 0
			? data?.filter((item) =>
					moment(item.orderDate).isBetween(
						moment().subtract(1, "week"),
						moment().startOf("week"),
						null,
						"[]"
					)
			  )
			: [];

	// Get orders for this week
	const thisWeekOrders =
		data.length > 0
			? data?.filter((item) =>
					moment(item.orderDate).isBetween(
						moment().startOf("week"),
						moment(),
						null,
						"[]"
					)
			  )
			: [];

	const thisWeekItems = thisWeekOrders?.map((item) => item.products);
	const lastWeekItems = lastWeekOrders?.map((item) => item.products);
	const thisWeekCount =
		thisWeekItems.length && thisWeekItems.reduce((a, b) => a + b.length, 0);
	const lastWeekCount =
		lastWeekItems.length && lastWeekItems.reduce((a, b) => a + b.length, 0);
	const itemsDiff = thisWeekCount - lastWeekCount;

	const itemsDivisor =
		itemsDiff >= 0
			? itemsDiff / totalProductQuantity
			: Math.abs(itemsDiff) / totalProductQuantity;
	const itemsPercentage = (itemsDivisor * 100).toFixed(2);

	const orderDiff = thisWeekOrders?.length - lastWeekOrders?.length;

	const orderDivisor =
		orderDiff >= 0
			? orderDiff / data?.length
			: Math.abs(orderDiff) / data?.length;
	const percentage = (orderDivisor * 100).toFixed(2);

	return (
		<div className="flex justify-between">
			<div className="py-2 px-4 rounded-lg border w-[30%]">
				<p className="text-gray-600">Total orders </p>
				{data ? (
					<p className="text-3xl font-bold my-2 text-gray-600">
						{data?.length} -{" "}
					</p>
				) : (
					<p className="animate-pulse w-12 h-6 bg-gray-200 my-2"></p>
				)}
				{orderDiff ? (
					<p
						className={`${itemsDiff >= 0 ? "text-green-300" : "text-red-300"} `}
					>
						{orderDiff > 0 ? `+${percentage}` : `-${percentage}`}% Last week
					</p>
				) : (
					<p className="animate-pulse w-40 h-6 bg-gray-200 my-2"></p>
				)}
			</div>
			<div className="py-2 px-4 rounded-lg border w-[30%]">
				<p className="text-gray-600">Order Items over time </p>
				{totalProductQuantity ? (
					<p className="text-3xl font-bold my-2 text-gray-600">
						{totalProductQuantity} -{" "}
					</p>
				) : (
					<p className="animate-pulse w-12 h-6 bg-gray-200 my-2"></p>
				)}
				{itemsDiff ? (
					<p
						className={`${itemsDiff > 0 ? "text-green-300" : "text-red-300"} `}
					>
						{itemsDiff >= 0 ? `+${itemsPercentage}` : `-${itemsPercentage}`}%
						Last week
					</p>
				) : (
					<p className="animate-pulse w-40 h-6 bg-gray-200 my-2"></p>
				)}
			</div>
			<div className="py-2 px-4 rounded-lg border w-[30%]">
				<p className="text-gray-600">Completed Orders </p>
				{completedOrders ? (
					<p className="text-3xl font-bold my-2 text-gray-600">
						{completedOrders?.length} -{" "}
					</p>
				) : (
					<p className="animate-pulse w-12 h-6 bg-gray-200 my-2"></p>
				)}
			</div>
		</div>
	);
};

export default OrderHeader;
