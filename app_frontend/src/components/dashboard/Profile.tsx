import axios from "axios";
import { FC, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";

const Profile: FC = () => {
	const { user, setUser } = useAuthContext();

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
	console.log(data?.user);

	useEffect(() => {
		setUser(!isLoading && data.user);
	}, [data?.user, isLoading, setUser]);

	return <div>{user?.first_name}</div>;
};

export default Profile;
