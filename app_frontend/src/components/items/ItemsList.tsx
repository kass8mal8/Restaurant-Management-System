// import { useState } from "react";
import OrderSkeleton from "../orders/OrderSkeleton";
import edit from "../../assets/images/edit.png";
import deleteIcon from "../../assets/images/delete.png";

type Item = {
	quantity: number;
	title: string;
	price: string;
	category: string;
	_id: string;
	inStock: string;
};

type ItemsProps = {
	items: Item[];
};

const ItemsList = ({ items }: ItemsProps) => {
	return (
		<div>
			{!items?.length ? (
				<OrderSkeleton />
			) : (
				<div>
					{items?.map((item) => (
						<ul
							key={item._id}
							className="flex justify-between items-center border-b py-2 px-4 hover:bg-gray-100 text-slate-700 relative"
						>
							<li className="border-r pr-8 min-w-[100px] text-left">
								#{item._id.slice(-5)}
							</li>

							<li className="border-r pr-8 min-w-[150px] text-center -ml-16">
								{item.title}
							</li>

							<li className="min-w-[120px] border-r -ml-16">
								ksh {item?.price}
							</li>

							<li className="px-3 py-1 rounded text-sm -ml-12 min-w-[50px] text-center">
								{item.quantity}
							</li>

							<li className="min-w-[100px] -mr-8 border-l pl-8">
								{item.category}
							</li>
							<li className="min-w-[100px] -mr-8 border-l pl-8">
								<p
									className={`${
										item.inStock === "true"
											? "bg-green-100 text-green-500 border-green-300 "
											: " rounded bg-orange-100 text-orange-500 border-orange-300"
									} text-sm px-4 py-1`}
								>
									{item.inStock === "true" ? "In stock" : "Out of stock"}
								</p>
							</li>

							<li className=" border-l pl-10 min-w-[100px] flex space-x-4">
								<img
									src={edit}
									alt="options"
									className="w-4 h-4 opacity-55 cursor-pointer"
								/>
								<img
									src={deleteIcon}
									alt="options"
									className="w-4 h-4 opacity-55 cursor-pointer"
								/>
							</li>
						</ul>
					))}
				</div>
			)}
		</div>
	);
};

export default ItemsList;
