const OrderSkeleton = () => {
	return (
		<div className="flex ml-4 w-[90%] justify-between gap-5">
			{[1, 2, 3, 4, 5, 6].map((i) => (
				<div key={i} className="w-full">
					{[1, 2, 3, 4, 5, 6].map((i) => (
						<div
							key={i}
							className="w-[95%] my-2 bg-gray-200 p-2 rounded animate-pulse h-9"
						></div>
					))}
				</div>
			))}
		</div>
	);
};

export default OrderSkeleton;
