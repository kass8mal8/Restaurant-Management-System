import { useLocation } from "react-router-dom";
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
					} mt-10 cursor-pointer p-2 rounded-r-lg pl-4`}
				>
					<a href="/" className="">
						Dashboard
					</a>
				</li>
				<li
					className={`${
						endpoints[1] === location.pathname &&
						"bg-[#F1F1FF] border-l-4 border-l-[#8282F2]"
					} my-6 cursor-pointer p-2 rounded-r-lg pl-4`}
				>
					<a href="/items">Menu Items</a>
				</li>
				<li
					className={`${
						endpoints[1] === location.pathname &&
						"bg-[#F1F1FF] border-l-4 border-l-[#8282F2]"
					} my-6 cursor-pointer p-2 rounded-r-lg pl-4`}
				>
					<a href="/orders">Orders</a>
				</li>
				<li
					className={`${
						endpoints[2] === location.pathname &&
						"bg-[#F1F1FF] border-l-4 border-l-[#8282F2]"
					} mb-6 cursor-pointer p-2 rounded-r-lg pl-4`}
				>
					<a href="/transactions">Transactions</a>
				</li>
				<li
					className={`${
						endpoints[3] === location.pathname &&
						"bg-[#F1F1FF] border-l-4 border-l-[#8282F2]"
					} mt-6 cursor-pointer p-2 rounded-r-lg pl-4`}
				>
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
