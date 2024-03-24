//@ts-nocheck
import axios from "axios";

export const api = axios.create({
  withCredentials: true,
  baseURL: "https://yourdomain.com/api/v1",
  headers: {
    "Allow-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

// defining a custom error handler for all APIs
const errorHandler = (error) => {
  const statusCode = error.response?.status;

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});