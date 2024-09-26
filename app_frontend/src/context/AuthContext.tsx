/* eslint-disable react-refresh/only-export-components */
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

// Define the types
type User = {
	first_name: string;
	last_name: string;
	email: string;
};

type AuthContextType = {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	const fetchProfile = async () => {
		try {
			console.log("Fetching profile...");
			const res = await axiosInstance.get("/auth/profile", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
			});
			console.log(res.data);
			return res.data;
		} catch (error) {
			console.log("Error fetching profile:", error);
		}
	};
	const { data } = useQuery({
		queryKey: ["users"],
		queryFn: fetchProfile,
	});
	useEffect(() => {
		if (data?.user) {
			setUser(data.user);
		}
	}, [data?.user, setUser]);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to use the AuthContext
export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return context;
};
