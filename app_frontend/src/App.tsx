import { Route, Routes } from "react-router-dom";
import Signup from "./components/authentication/Signup";
import Signin from "./components/authentication/Signin";
import Dashboard from "./components/dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContext } from "./components/context/AuthContext";
import { useState } from "react";

type User = {
	first_name: string;
	last_name: string;
	email: string;
};

const App: React.FC = () => {
	const [user, setUser] = useState<User | undefined>(undefined);
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<AuthContext.Provider value={{ user, setUser }}>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/signin" element={<Signin />} />
				</Routes>
			</AuthContext.Provider>
		</QueryClientProvider>
	);
};

export default App;
