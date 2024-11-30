// import { useState } from "react";
import OrderSkeleton from "../orders/OrderSkeleton";
import edit from "../../assets/images/edit.png";
import deleteIcon from "../../assets/images/delete.png";
import AddItem from "./AddItem";
import { useEffect, useRef } from "react";

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
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
};

const ItemsList = ({ items, isOpen, setIsOpen }: ItemsProps) => {
	const modalRef = useRef<HTMLDialogElement | null>(null);

	const handleClose = (e: React.MouseEvent<HTMLDialogElement>) => {
		const dimensions = modalRef.current?.getBoundingClientRect();
		if (dimensions) {
			if (
				e.clientX < dimensions.left ||
				e.clientX > dimensions.right ||
				e.clientY < dimensions.top ||
				e.clientY > dimensions.bottom
			) {
				setIsOpen(false);
				modalRef.current?.close();
			}
		}
	};
	useEffect(() => {
		if (isOpen) modalRef.current?.showModal();
	}, [isOpen]);
	return (
		<div>
			<dialog
				ref={modalRef as React.RefObject<HTMLDialogElement>}
				onClick={handleClose}
				className="border p-0 -mb-4 md:mb-auto py-5 px-6 w-full md:w-1/3 rounded-2xl max-w-[50ch] backdrop:opacity-50 backdrop:bg-black"
			>
				<AddItem />
			</dialog>
			{!items ? (
				<OrderSkeleton />
			) : (
				<>
					{items?.length ? (
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
					) : (
						<p className="mt-5 text-center text-gray-500">
							No Items yet available
						</p>
					)}
				</>
			)}
		</div>
	);
};

export default ItemsList;
