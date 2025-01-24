import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

export const getAccessToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

export const getRefreshToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("refresh_token");
  }
  return null;
};

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    console.error("Invalid token:", error);
    return true;
  }
};

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/auth/renew`,{},{
        headers: {
          Authorization: "Bearer " + refreshToken,
        },
  
    })
    if (res.data.status === "success") {
     
      localStorage.setItem("access_token", res.data.access_token);
      return res.data.access_token;
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = `${process.env.NEXT_PUBLIC_LOGIN_URL}/redirect?id=${process.env.NEXT_PUBLIC_AP_ID}`;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};
