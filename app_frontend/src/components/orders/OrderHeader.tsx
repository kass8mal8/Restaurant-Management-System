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
	return (
		<div className="flex justify-between">
			<div className="py-2 px-4 rounded border">
				<p className="text-slate-700">Total orders </p>
				<p className="text-2xl font-bold">{data?.length} - </p>
			</div>
			<p className="bg-gray-200 py-1 px-3 rounded">Export</p>
		</div>
	);
};

export default OrderHeader;
