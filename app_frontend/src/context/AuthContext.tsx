/* eslint-disable react-refresh/only-export-components */
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { isAxiosError } from "axios";

// Define the types
type User = {
	first_name: string;
	last_name: string;
	email: string;
	id: string;
};

type AuthContextType = {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const res = await axiosInstance.get("/auth/profile", {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				});
				setUser(res.data?.user);
			} catch (error) {
				setTimeout(() => {
					if (location?.pathname !== "/signup") navigate("/signin");
				}, 6000);
				if (isAxiosError(error) && error?.response) {
					console.log(error?.response.data.message);
				}
			}
		};

		fetchProfile();
	}, [navigate]);

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
