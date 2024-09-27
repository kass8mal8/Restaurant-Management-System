import Order from "./Order";

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

const OrderHeader = ({ data }: OrderProps) => {
	const totalProductQuantity = data?.reduce((total, item) => {
		const orderProductQuantity = item?.products.reduce(
			(orderTotal, product) => orderTotal + product?.productQuantity,
			0
		);
		return total + orderProductQuantity;
	}, 0);

	const completedOrders = data?.filter((item) => item.status !== "Pending");

	return (
		<div className="flex space-x-4">
			<div className="py-2 px-4 rounded-lg border w-[20%]">
				<p className="text-slate-700">Total orders </p>
				<p className="text-3xl font-bold my-2">{data?.length} - </p>
			</div>
			<div className="py-2 px-4 rounded-lg border w-[20%]">
				<p className="text-slate-700">Order Items </p>
				<p className="text-3xl font-bold my-2">{totalProductQuantity} - </p>
			</div>
			<div className="py-2 px-4 rounded-lg border w-[20%]">
				<p className="text-slate-700">Completed Orders </p>
				<p className="text-3xl font-bold my-2">{completedOrders?.length} - </p>
			</div>
			<p className="bg-gray-200 py-1 px-3 rounded">Export</p>
		</div>
	);
};

export default OrderHeader;
