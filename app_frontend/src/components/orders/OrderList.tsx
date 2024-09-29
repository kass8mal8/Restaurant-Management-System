import useFetch from "../../hooks/useFetch";
import edit from "../../assets/images/edit.png";
import deleteIcon from "../../assets/images/delete.png";

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

type User = {
	_id: string;
	firstName: string;
	lastName: string;
};

const OrderList = ({ data }: OrderProps) => {
	const { data: userData } = useFetch("/auth/users", "users");

	// Sort orders by orderDate in descending order (most recent first)
	const sortedOrders = data?.sort(
		(a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
	);

	const users = sortedOrders?.map((item) => {
		const userOne = userData?.user?.find(
			(user: User) => user._id === item.userId
		);

		return {
			username: `${userOne?.firstName} ${userOne?.lastName}`,
		};
	});

	return (
		<>
			{sortedOrders?.map((item, index) => (
				<ul
					key={item._id}
					className="flex justify-between items-center border-b py-2 px-4 hover:bg-gray-100 text-slate-700"
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

					<li className="min-w-[150px] border-r">{users[index]?.username}</li>

					<li
						className={`${
							item.status === "Pending"
								? "bg-orange-100 px-4 text-orange-500 border-orange-300"
								: "bg-green-100 border-green-300 text-green-500"
						} px-3 py-1 rounded text-sm -ml-8 min-w-[120px] text-center`}
					>
						{item.status}
					</li>

					<li className="min-w-[150px] border-x px-8">Ksh {item.totalPrice}</li>

					<li className="min-w-[80px] text-center pr-12 border-r">
						{item.products.length} Items
					</li>

					<li className="min-w-[60px] text-center flex justify-between opacity-55">
						<img src={deleteIcon} alt="delete" className="w-4 h-4" />
						<img src={edit} alt="edit" className="w-4 h-4" />
					</li>
				</ul>
			))}
		</>
	);
};

export default OrderList;
