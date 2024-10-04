// import axios from "axios";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
// import { useQuery } from "@tanstack/react-query";
import profile from "../../assets/images/user.png";
// import { useNavigate } from "react-router-dom";

const Profile = () => {
	const { user } = useAuthContext();

	useEffect(() => {}, [user]);

	return (
		<div className="flex space-x-3 p-2 rounded-lg items-center border min-w-[150px] float-right">
			<img src={profile} alt="user profile" className="w-6 h-6" />
			<p>
				{user?.first_name} {user?.last_name}
			</p>
		</div>
	);
};

export default Profile;
