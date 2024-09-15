import { useState } from "react";
import axios from "axios";

const usePost = (url: string) => {
	const [loading, setLoading] = useState(false);

	const post = async (body: object | null) => {
		setLoading(true);
		try {
			const res = await axios.post(url, body, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			return res.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				throw error.response.data;
			} else {
				throw new Error("An unexpected error occurred");
			}
		} finally {
			setLoading(false);
		}
	};

	return { post, loading };
};

export default usePost;
