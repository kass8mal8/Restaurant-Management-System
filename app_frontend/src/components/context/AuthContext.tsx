import { createContext, useContext, Dispatch, SetStateAction } from "react";

// Define the type for user details
type User = {
	first_name: string;
	last_name: string;
	email: string;
};

// Define the type for AuthContext, including both user and setUser
type AuthContextType = {
	user: User | undefined;
	setUser: Dispatch<SetStateAction<User | undefined>>;
};

// Initialize the context with the correct type and provide a default value of undefined
export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

// Custom hook to access the AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within AuthContextProvider");
	}
	return context;
};
