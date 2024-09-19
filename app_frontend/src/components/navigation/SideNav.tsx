import { useLocation } from "react-router-dom";
import items from "../../assets/images/items.png";
import bill from "../../assets/images/bill.png";
import dashboard from "../../assets/images/dashboard.png";
import reports from "../../assets/images/report.png";
import orders from "../../assets/images/orders.png";
// import usePost from "../hooks/usePost"

const SideNav = () => {
	const location = useLocation();
	const endpoints = ["/", "/orders", "/transactions", "/reports"];
	// const url = "http://localhost:5000/api/auth/signout"
	// const {post} = usePost(url)

	const handleLogOut = async () => {
		// try {
		// 	const res = await post()
		// }
		// catch(error) {
		// 	if(error instanceof Error) console.log(error.message)
		// }
	};

	return (
		<div className="bg-white p-4 w-[15%] fixed left-0 top-0 h-[100lvh]">
			<ul className="mt-4">
				<li
					className={`${
						endpoints[0] === location.pathname &&
						"bg-[#F1F1FF] border-l-4 border-l-[#8282F2] "
					} mt-20 cursor-pointer p-2 rounded-r-lg pl-4 flex space-x-3 items-center`}
				>
					<img src={dashboard} alt="dashboard" className="w-5 h-5 opacity-55" />
					<a href="/" className="">
						Dashboard
					</a>
				</li>
				<li
					className={`${
						endpoints[1] === location.pathname &&
						"bg-[#F1F1FF] border-l-4 border-l-[#8282F2]"
					} my-6 cursor-pointer p-2 rounded-r-lg pl-4 flex space-x-3 items-center`}
				>
					<img src={items} alt="items" className="w-5 h-5 opacity-55" />
					<a href="/items">Menu Items</a>
				</li>
				<li
					className={`${
						endpoints[1] === location.pathname &&
						"bg-[#F1F1FF] border-l-4 border-l-[#8282F2]"
					} my-6 cursor-pointer p-2 rounded-r-lg pl-4 flex space-x-3 items-center`}
				>
					<img src={orders} alt="orders" className="w-5 h-5" />
					<a href="/orders">Orders</a>
				</li>
				<li
					className={`${
						endpoints[2] === location.pathname &&
						"bg-[#F1F1FF] border-l-4 border-l-[#8282F2]"
					} mb-6 cursor-pointer p-2 rounded-r-lg pl-4 flex space-x-3 items-center`}
				>
					<img src={bill} alt="bill" className="w-5 h-5" />
					<a href="/transactions">Transactions</a>
				</li>
				<li
					className={`${
						endpoints[3] === location.pathname &&
						"bg-[#F1F1FF] border-l-4 border-l-[#8282F2]"
					} mt-6 cursor-pointer p-2 rounded-r-lg pl-4 flex space-x-3 items-center`}
				>
					<img src={reports} alt="reports" className="w-5 h-5" />
					<a href="/reports">Reports</a>
				</li>
			</ul>
			<button
				className="text-gray-600 absolute bottom-4 font-bold left-8"
				onClick={handleLogOut}
			>
				Log Out
			</button>
		</div>
	);
};

export default SideNav;
