import axiosInstance from "../utils/axiosInstance";

const useFetch = (endpoint: string) => {
	const fetch = async () => {
		try {
			console.log("Fetching profile...");
			const res = await axiosInstance.get(endpoint, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
			});
			console.log(res.data);
			return res.data;
		} catch (error) {
			console.log("Error fetching profile:", error);
		}
	};

	return { fetch };
};

export default useFetch;
