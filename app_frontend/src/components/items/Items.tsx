import { useEffect, useState } from "react";
// import { useAuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import ItemsHeader from "./ItemsHeader";
import ItemsList from "./ItemsList";
import ItemsSort from "./ItemsSort";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Items = () => {
	const { user } = useAuthContext();
	const { data: items } = useFetch(`/items/${user?.id}`, "items");
	const statuses = ["true", "false"];
	const [status, setStatus] = useState<string>("");
	const [itemData, setItemData] = useState(items);

	console.log(user);

	useEffect(() => {
		if (statuses.includes(status)) {
			const index = statuses.indexOf(status);
			const filteredItems = items?.filter(
				(item: { inStock: string }) => item.inStock === statuses[index]
			);
			console.log(filteredItems);
			setItemData(filteredItems);
		} else {
			setItemData(items);
		}
	}, [items, status]);
	const navigate = useNavigate();

	return (
		<div className="ml-[17%] mt-[6%] w-[82%]">
			<div className="flex justify-between">
				<button
					className="border text-slate-500 px-5 py-2 rounded-md my-2 hover:bg-gray-200 transform transition duration-200"
					onClick={() => navigate("/items/add")}
				>
					Add new
				</button>
				<ItemsSort status={status} setStatus={setStatus} statuses={statuses} />
			</div>
			<ItemsHeader />
			<ItemsList items={itemData || []} />
			<Outlet />
		</div>
	);
};

export default Items;
