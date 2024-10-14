import options from "../../assets/images/options.png";
import { useState } from "react";
import OrderSkeleton from "./OrderSkeleton";
import axiosInstance from "../../utils/axiosInstance";
import { QueryClient } from "@tanstack/react-query";
import OrderCard from "./OrderCard";

type Order = {
	_id: string;
	orderDate: string;
	products: {
		productName: string;
		productPrice: number;
		productQuantity: number;
		_id: string;
	}[];
	totalPrice: number;
	status: string;
	userId: string;
	telephone: string;
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
	const [isOpen, setIsOpen] = useState(false);

	const queryClient = new QueryClient();
	const refetchOrders = () =>
		queryClient.invalidateQueries({ queryKey: ["orders"] });

	const handleOrderUpdate = async (orderId: string) => {
		try {
			await axiosInstance.put(`/orders/update/${orderId}`, {
				status: "Completed",
			});
			refetchOrders();
		} catch (error) {
			console.error(error);
		}
	};
	const [viewId, setViewId] = useState<string>("");
	// console.log(viewId);
	const handleView = (id: string) => {
		setViewId(id);
		setIsOpen(true);
	};

	return (
		<div>
			{!sortedOrders ? (
				<OrderSkeleton />
			) : (
				<>
					<OrderCard
						orders={data}
						id={viewId}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
					/>
					{sortedOrders?.map((item) => (
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
								className="min-w-[60px] cursor-pointer p-2 text-center flex justify-between opacity-55"
								onClick={() => setSelectedOrderId(item._id)}
							>
								<img src={options} alt="options" className="w-5 h-1" />
							</li>

							{item._id === selectedOrderId && (
								<ul className="absolute my-2 text-sm rounded right-0 bg-white z-30 shadow-md">
									{item.status === "Pending" && (
										<li
											className="p-2 hover:bg-gray-200 cursor-pointer"
											onClick={() => handleOrderUpdate(item._id)}
										>
											Mark completed
										</li>
									)}
									<li
										className="p-2 border-y hover:bg-gray-200 cursor-pointer"
										onClick={() => handleView(item._id)}
									>
										View
									</li>
									<li className="p-2 hover:bg-gray-200 cursor-pointer">
										Delete
									</li>
								</ul>
							)}
						</ul>
					))}
				</>
			)}
		</div>
	);
};

export default OrderList;
