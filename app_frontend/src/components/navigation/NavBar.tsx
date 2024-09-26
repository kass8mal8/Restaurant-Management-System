import { useLocation } from "react-router-dom";
import Profile from "../dashboard/Profile";

const NavBar = () => {
	const location = useLocation();
	return (
		<div className="bg-white w-[83%] p-3 fixed top-0 items-center flex justify-between left-[17%] rounded-bl">
			<h2 className="font-bold text-xl">{location.pathname.slice(1)}</h2>
			<Profile />
		</div>
	);
};

export default NavBar;
