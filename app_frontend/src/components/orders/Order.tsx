import useFetch from "../../hooks/useFEtch";
import { useQuery } from "@tanstack/react-query";

const Order = () => {
	const { fetch } = useFetch("/orders");
	const { data, isLoading, error } = useQuery({
		queryKey: ["users"],
		queryFn: fetch,
		refetchOnWindowFocus: false,
		refetchInterval: 60 * 60 * 1000, // Refresh token every hour (60 minutes * 60 seconds)
	});

	console.log(data);

	return <div>Hello world</div>;
};

export default Order;
