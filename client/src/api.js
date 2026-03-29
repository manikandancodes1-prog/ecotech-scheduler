import axios from "axios";

/**
 * Global Axios Instance Configuration
 * Base URL is set to the backend server
 */
const API = axios.create({ baseURL: "https://ecotech-backend-t1mq.onrender.com/api" });

/**
 * Request Interceptor
 * Automatically attaches the JWT token to every outgoing request 
 * for authenticated routes.
 */
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    // Standard header used by our backend middleware to verify users
    req.headers["x-auth-token"] = token;
  }
  return req;
});

/**
 * Response Interceptor
 * Handles global error responses, specifically 401 Unauthorized errors.
 * If the token expires or is invalid, it clears local storage and redirects to login.
 */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the server returned a 401 Unauthorized status
    if (error.response && error.response.status === 401) {
      // Clear session data to prevent unauthorized access attempts
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      // Force redirect to login page for re-authentication
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default API;