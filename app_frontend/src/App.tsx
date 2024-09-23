import { Route, Routes } from "react-router-dom";
import Signup from "./components/authentication/Signup";
import Signin from "./components/authentication/Signin";
import Dashboard from "./components/dashboard/Dashboard";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
	return (
		<AuthProvider>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/signin" element={<Signin />} />
			</Routes>
		</AuthProvider>
	);
};

export default App;
