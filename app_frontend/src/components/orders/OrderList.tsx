// import { ReactNode } from "react";

type Order = {
	id: string;
	orderDate: string;
	products: object[];
	totalPrice: number;
	status: string;
	userId: string;
};

type OrderProps = {
	data: Order[];
};

const OrderList = ({ data }: OrderProps) => {
	const d = new Date();
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	return (
		<>
			{data?.map((item) => (
				<div key={item.id}>
					<p>{item.userId}</p>
					{/* <p>{months[item.orderDate.slice(5, 7)]}</p> */}
				</div>
			))}
		</>
	);
};

export default OrderList;
