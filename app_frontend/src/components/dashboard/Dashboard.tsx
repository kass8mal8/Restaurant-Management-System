import { Outlet } from "react-router-dom";
import NavBar from "../navigation/NavBar";
import SideNav from "../navigation/SideNav";
import useFetch from "../../hooks/useFetch";
import Header from "./Header";

const Dashboard = () => {
	const { data: orders } = useFetch("/orders", "orders");

	return (
		<div>
			<NavBar />
			<SideNav />
			<Outlet />

			<Header orders={orders} />
		</div>
	);
};

export default Dashboard;
