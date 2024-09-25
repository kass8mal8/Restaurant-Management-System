import { Outlet } from "react-router-dom";
import NavBar from "../navigation/NavBar";
import SideNav from "../navigation/SideNav";

const Dashboard = () => {
	return (
		<div>
			<NavBar />
			<SideNav />
			<Outlet />
		</div>
	);
};

export default Dashboard;
