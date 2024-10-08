import { useEffect, useState } from "react";
// import { useAuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import ItemsHeader from "./ItemsHeader";
import ItemsList from "./ItemsList";
import ItemsSort from "./ItemsSort";

const Items = () => {
	// const { user } = useAuthContext();
	const { data: items } = useFetch("/items/66e801ef3a520bd299866ddf", "items");
	const statuses = ["true", "false"];
	const [status, setStatus] = useState<string>("");
	const [itemData, setItemData] = useState(items);

	console.log(itemData);

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

	return (
		<div className="ml-[17%] mt-[6%] w-[82%]">
			<div className="flex justify-between">
				<button className="border text-slate-500 px-5 py-2 rounded-md my-2 hover:bg-gray-200 transform transition duration-200">
					Add new
				</button>
				<ItemsSort status={status} setStatus={setStatus} statuses={statuses} />
			</div>
			<ItemsHeader />
			<ItemsList items={itemData || []} />
		</div>
	);
};

export default Items;
