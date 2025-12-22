// // // src/utils/api.js

import axios from "axios";
import { API_URL } from "../config.js";



const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});


// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000",
//   withCredentials: true, // send cookie refreshToken automatically
// });

// -------------------------
// Load saved access token
// -------------------------
const savedToken = localStorage.getItem("accessToken");
if (savedToken) {
  API.defaults.headers.common["Authorization"] = "Bearer " + savedToken;
}

// -------------------------
// Refreshing logic
// -------------------------
let isRefreshing = false;
let subscribers = [];

// queue subscribers when refresh is happening
function subscribeToken(cb) {
  subscribers.push(cb);
}

function onRefreshed(token) {
  subscribers.forEach(cb => cb(token));
  subscribers = [];
}

// -------------------------
// Response interceptor
// -------------------------
API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    // only retry once
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Call refresh endpoint (cookie refreshToken included)
          const res = await axios.post(
            "http://localhost:5000/auth/refresh",
            {},
            { withCredentials: true }
          );

          const newToken = res.data.accessToken;

          // Save token
          localStorage.setItem("accessToken", newToken);
          API.defaults.headers.common["Authorization"] = "Bearer " + newToken;

          isRefreshing = false;
          onRefreshed(newToken);

          return API(original);

        } catch (refreshErr) {
          isRefreshing = false;
          localStorage.removeItem("accessToken");
          window.location.href = "/";
          return Promise.reject(refreshErr);
        }
      }

      // wait for refresh to complete
      return new Promise((resolve) => {
        subscribeToken((token) => {
          original.headers["Authorization"] = "Bearer " + token;
          resolve(API(original));
        });
      });
    }

    return Promise.reject(err);
  }
);

export default API;






