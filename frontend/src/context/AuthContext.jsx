import { createContext, useState, useMemo } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userInfos, setUserInfos] = useState({});

  const setUserTokenCookie = (token) => {
    if (token) {
      // Set the expiration date to 1 minute from now
      const expirationDate = new Date();
      expirationDate.setMinutes(expirationDate.getMinutes() + 1440);
      Cookies.set("userToken", token, {
        expires: expirationDate,
      });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  const value = useMemo(
    () => ({
      setUserTokenCookie,
      userToken,
      userInfos,
      setUserInfos,
    }),
    [userToken, userInfos]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
