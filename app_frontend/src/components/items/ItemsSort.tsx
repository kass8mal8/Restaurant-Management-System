type ItemSortProps = {
	status: string;
	statuses: string[];
	setStatus: (status: string) => void;
	// setData: (data: Item[]) => void,
};

const ItemsSort = ({ status, statuses, setStatus }: ItemSortProps) => {
	return (
		<div className="flex justify-between items-center my-2 sticky top-[12%]">
			{/* <SearchOrder data={data} setData={setData} /> */}
			<ul className="flex space-x-4 items-center bg-gray-200  rounded-lg py-1 px-2 opacity-75">
				<li
					onClick={() => setStatus("All")}
					className={`${
						!statuses.includes(status) && "bg-white px-4 py-1 rounded"
					} cursor-pointer`}
				>
					All
				</li>
				<li
					onClick={() => setStatus("true")}
					className={`${
						statuses[0] === status && "bg-white px-4 py-1 rounded"
					} cursor-pointer`}
				>
					In stock
				</li>
				<li
					onClick={() => setStatus("false")}
					className={`${
						statuses[1] === status && "bg-white px-4 py-1 rounded"
					} cursor-pointer`}
				>
					Out of stock
				</li>
			</ul>
		</div>
	);
};

export default ItemsSort;
