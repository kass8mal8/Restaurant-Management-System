import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
	baseURL: "http://localhost:5000/api", // backend API
	withCredentials: true, // For sending cookies (refresh token)
});

export default axiosInstance;
