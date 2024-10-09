import { useRef, useEffect } from "react";

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

type OrderCardProps = {
	orders: Order[];
	id: string;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
};

const OrderCard = ({ orders, id, isOpen, setIsOpen }: OrderCardProps) => {
	const order = orders?.filter((order) => order._id === id);
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
	console.log(order);
	return (
		<dialog
			ref={modalRef as React.RefObject<HTMLDialogElement>}
			onClick={handleClose}
			className="border p-0 -mb-4 md:mb-auto text-gray-600 bg-gray-50 py-5 px-6 w-full md:w-1/3 rounded-xl max-w-[50ch] backdrop:opacity-50 backdrop:bg-black outline-none"
		>
			{order.map((item) => (
				<div key={item._id}>
					<div className="flex justify-between">
						<p>{item.telephone}</p>
						<p>{item.products.length} Items</p>
					</div>
					<ul className="flex justify-between p-2 mt-4 bg-gray-100 rounded-t">
						<li>Item</li>
						<li>Quantity</li>
						<li>Price</li>
					</ul>
					{item.products.map((prod, index) => (
						<ul>
							<div className="flex justify-between my-2 border-b p-2">
								<li className="min-w-[120px] border-r">
									{index + 1}. {prod.productName}
								</li>
								<li className="min-w-[50px] border-r">
									{prod.productQuantity}
								</li>
								<li className="min-w-[40px]">ksh {prod.productPrice}</li>
							</div>
						</ul>
					))}

					<div className="flex justify-between mt-3 px-2">
						<p>Total</p>
						<p>ksh {item.totalPrice}</p>
					</div>

					<div className="flex justify-between mt-3 items-center">
						<button className="w-[40%] border border-red-400 rounded p-2 hover:bg-red-400 hover:text-white transition duration-300">
							Delete
						</button>
						<button className="min-w-[55%] bg-[#8282F2] text-white p-2 rounded">
							Print receipt
						</button>
					</div>
				</div>
			))}
		</dialog>
	);
};

export default OrderCard;
