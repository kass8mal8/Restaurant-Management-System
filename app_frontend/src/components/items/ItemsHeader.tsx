const ItemsHeader = () => {
	return (
		<ul className="flex justify-between bg-gray-200 py-2 px-4 rounded-t mb-2 opacity-60 font-semibold">
			<li>Item Id</li>
			<li>Item</li>
			<li>Price</li>
			<li>Quantity</li>
			<li>Category</li>
			<li>Status</li>
			<li>Actions</li>
		</ul>
	);
};

export default ItemsHeader;
