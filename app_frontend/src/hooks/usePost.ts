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
			setLoading(false);
			throw error?.response?.data ?? error;
		} finally {
			setLoading(false);
		}
	};

	return { post, loading };
};

export default usePost;
