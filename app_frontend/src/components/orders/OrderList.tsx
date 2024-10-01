import options from "../../assets/images/options.png";
import { useState } from "react";
import OrderSkeleton from "./OrderSkeleton";

type Order = {
	_id: string;
	orderDate: string;
	products: object[];
	totalPrice: number;
	status: string;
	userId: string;
	telephone: number;
};

type OrderProps = {
	data: Order[];
};

const OrderList = ({ data }: OrderProps) => {
	// Sort orders by orderDate in descending order (most recent first)
	const sortedOrders = data?.sort(
		(a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
	);
	const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

	return (
		<>
			{!sortedOrders ? (
				<OrderSkeleton />
			) : (
				sortedOrders?.map((item) => (
					<ul
						key={item._id}
						className="flex justify-between items-center border-b py-2 px-4 hover:bg-gray-100 text-slate-700 relative"
					>
						<li className="border-r pr-8 min-w-[100px] text-left">
							#{item._id.slice(-5)}
						</li>

						<li className="border-r pr-8 min-w-[150px] text-center -ml-8">
							{new Date(item.orderDate).toLocaleDateString("en-US", {
								day: "numeric",
								month: "short",
								year: "numeric",
							})}
						</li>

						<li className="min-w-[150px] border-r">{item?.telephone}</li>

						<li
							className={`${
								item.status === "Pending"
									? "bg-orange-100 px-4 text-orange-500 border-orange-300"
									: "bg-green-100 border-green-300 text-green-500"
							} px-3 py-1 rounded text-sm -ml-8 min-w-[120px] text-center`}
						>
							{item.status}
						</li>

						<li className="min-w-[150px] border-x px-8">
							Ksh {item.totalPrice}
						</li>

						<li className="min-w-[80px] text-center pr-12 border-r">
							{item.products.length} Items
						</li>

						<li
							className="min-w-[60px] cursor-pointer text-center flex justify-between opacity-55"
							onClick={() => setSelectedOrderId(item._id)}
						>
							{/* <img src={deleteIcon} alt="delete" className="w-4 h-4" />
						<img src={printer} alt="printer" className="w-4 h-4" /> */}
							<img src={options} alt="options" className="w-5 h-1" />
						</li>

						{item._id === selectedOrderId && (
							<ul className="absolute my-2 text-sm rounded right-0 bg-white z-30">
								<li className="p-2 hover:bg-gray-200">Mark completed</li>
								<li className="p-2 border-y hover:bg-gray-200">View</li>
								<li className="p-2 hover:bg-gray-200">Delete</li>
							</ul>
						)}
					</ul>
				))
			)}
		</>
	);
};

export default OrderList;
