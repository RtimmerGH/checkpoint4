import { createContext, useState, useMemo, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginModal, setLoginModal] = useState(false);

  const { VITE_BACKEND_URL } = import.meta.env;

  axios.defaults.baseURL = VITE_BACKEND_URL;
  axios.defaults.headers.common.Authorization = `Bearer ${Cookies.get(
    "userToken"
  )}`;

  useEffect(() => {
    const token = Cookies.get("userToken");
    if (token) {
      axios
        .get(`/reconnect`)
        .then((response) => {
          setUserName(response.data.name);
          setUserEmail(response.data.email);
          setUserRole(response.data.admin);
          setUserId(response.data.id);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else setIsLoading(false);
  }, []);

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
      setUserName("");
      setUserEmail("");
      setUserRole(0);
      setUserId(null);
    }
  };

  const value = useMemo(
    () => ({
      userId,
      setUserId,
      userName,
      setUserName,
      setUserTokenCookie,
      userToken,
      userEmail,
      setUserEmail,
      userRole,
      setUserRole,
      loginModal,
      setLoginModal,
    }),
    [userToken, userName, userEmail, userRole, userId, loginModal]
  );

  return (
    !isLoading && (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
  );
}
