import { Route, Routes } from "react-router-dom";
import Signup from "./components/authentication/Signup";
import Signin from "./components/authentication/Signin";
import Dashboard from "./components/dashboard/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import Order from "./components/orders/Order";
import Items from "./components/items/Items";
import AddItem from "./components/items/AddItem";

const App: React.FC = () => {
	return (
		<AuthProvider>
			<Routes>
				<Route path="/" element={<Dashboard />}>
					<Route path="orders" element={<Order />} />
					<Route path="items" element={<Items />} />
					<Route path="/items/add" element={<AddItem />} />
				</Route>
				<Route path="/signup" element={<Signup />} />
				<Route path="/signin" element={<Signin />} />
			</Routes>
		</AuthProvider>
	);
};

export default App;
