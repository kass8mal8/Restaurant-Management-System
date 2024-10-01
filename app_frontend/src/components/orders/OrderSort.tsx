import SearchOrder from "./SearchOrder";

type Order = {
	_id: string;
	orderDate: string;
	products: object[];
	totalPrice: number;
	status: string;
	userId: string;
};

type OrderSortProps = {
	setStatus: (status: string) => void;
	statuses: string[];
	status: string; // Current selected status (All, Pending, Completed)
	data: Order[];
	setData: (data: Order) => void;
};

const OrderSort = ({
	setStatus,
	statuses,
	status,
	data,
	setData,
}: OrderSortProps) => {
	return (
		<div className="flex justify-between items-center my-2 sticky top-[12%]">
			<SearchOrder data={data} setData={setData} />
			<ul className="flex space-x-4 items-center bg-gray-200 w-[23%] rounded-lg py-1 px-2 opacity-75">
				<li
					onClick={() => setStatus("All")}
					className={`${
						!statuses.includes(status) && "bg-white px-4 py-1 rounded"
					} cursor-pointer`}
				>
					All
				</li>
				<li
					onClick={() => setStatus("Pending")}
					className={`${
						statuses[0] === status && "bg-white px-4 py-1 rounded"
					} cursor-pointer`}
				>
					Pending
				</li>
				<li
					onClick={() => setStatus("Completed")}
					className={`${
						statuses[1] === status && "bg-white px-4 py-1 rounded"
					} cursor-pointer`}
				>
					Completed
				</li>
			</ul>
		</div>
	);
};

export default OrderSort;
