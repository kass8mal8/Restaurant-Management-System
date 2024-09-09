import { useLocation } from "react-router-dom";
import logo from "../../assets/images/order-food.png";

const Introduction = () => {
	const routes: [string, string] = ["/signin", "/signup"];
	const location = useLocation();

	return (
		<div className="flex justify-between items-center ml-4 my-3">
			<div className="flex space-x-2 items-center">
				<img src={logo} alt="logo" className="w-10 h-10" />
				<p className="font-bold text-2xl text-gray-400">RIMS</p>
			</div>
			<p className="text-2xl font-bold mr-4 text-gray-400">
				{location.pathname === routes[0] ? "Signin" : "Signup"}
			</p>
		</div>
	);
};

export default Introduction;
