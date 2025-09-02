import axios from "axios";

// Replace this with your actual backend URL deployed on Render
const BACKEND_URL = "https://atmosphere-chat-app.onrender.com";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"  // local backend during dev
    : `${BACKEND_URL}/api`;        // deployed backend in production

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // allow cookies to be sent with requests
});
