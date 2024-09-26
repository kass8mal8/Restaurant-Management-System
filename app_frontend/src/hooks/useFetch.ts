import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { isAxiosError } from "axios";

const useFetch = (endpoint: string, queryKey: string) => {
	const fetch = async () => {
		try {
			const res = await axiosInstance.get(endpoint);
			console.log("Response:", res);
			if (res.data) {
				return res.data;
			} else {
				throw new Error("No data returned from the server.");
			}
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error.response?.data?.message || error.message);
			}
		}
	};

	const { data, isLoading, error } = useQuery({
		queryKey: [queryKey],
		queryFn: fetch, // Refresh token every hour (60 minutes * 60 seconds)
	});

	return { data, isLoading, error };
};

export default useFetch;
