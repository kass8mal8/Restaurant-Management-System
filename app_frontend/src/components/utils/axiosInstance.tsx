import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
	baseURL: "http://localhost:5000/api", // backend API
	withCredentials: true, // For sending cookies (refresh token)
});

// Interceptor for setting the access token in request headers
axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = localStorage.getItem("accessToken");
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Interceptor for handling refresh token
axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response?.status === 403 ||
			(error.response?.status === 304 && !originalRequest._retry)
		) {
			originalRequest._retry = true;
			try {
				const res = await axiosInstance.get("/auth/refresh_token", {
					withCredentials: true,
				});
				const newAccessToken = res.data.accessToken;

				// Store the new access token
				localStorage.setItem("accessToken", newAccessToken);

				// Retry the original request with the new token
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return axiosInstance(originalRequest);
			} catch (err) {
				console.error("Token refresh failed", err);
				// Redirect to signin page if refresh fails
				window.location.href = "/signin";
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
