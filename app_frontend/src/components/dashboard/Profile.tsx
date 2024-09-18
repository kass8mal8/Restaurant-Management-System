import axios from "axios";
import { FC, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import profile from "../../assets/images/profile.jpg";

const Profile: FC = () => {
	const { user, setUser } = useAuthContext();
	// const navigate = useNavigate();

	// fetch user profile
	const url = "http://localhost:5000/api/auth/profile";
	const fetchProfile = async () => {
		try {
			const res = await axios.get(url, { withCredentials: true });
			return res.data;
		} catch (error) {
			if (axios.isAxiosError(error)) console.log(error.message);
		}
	};

	const { data, isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: fetchProfile,
	});

	useEffect(() => {
		setUser(!isLoading && data.user);
	}, [data?.user, isLoading, setUser]);

	return (
		<div className="flex space-x-2 p-2 rounded items-center border border-gray-300 w-40">
			{/* <p className="text-2xl font-bold">{user?.first_name[0]}</p> */}
			<img src={profile} alt="user profile" className="w-8 h-8" />
			<p>
				{user?.first_name} {user?.last_name}
			</p>
		</div>
	);
};

export default Profile;
