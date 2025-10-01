import {Outlet, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import api from "@/api/axiosInstance";
import {tokenStorage} from "@/tokenStorage/tokenStorage";
import {clearAuthState, setAuthState} from "@/store/Auth/tokenSlice";


const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true); // - флаг загрузки
  const authState = useSelector((state) => state.auth.authState);

  useEffect(() => {
    const initAuth = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const res = await api.post("/auth/refresh", { refreshToken });
          tokenStorage.setToken(res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          dispatch(setAuthState(true));
        } catch (err) {
          console.error("Ошибка при обновлении токена", err);
          localStorage.removeItem("refreshToken");
          tokenStorage.clearToken();
          dispatch(clearAuthState());
        }
      } else {
        dispatch(clearAuthState());
      }
      setIsLoading(false); // - загрузка завершена
    };

    initAuth();
  }, [dispatch]);

  if (isLoading) {
    return <div>Загрузка...</div>; // можно спиннер
  }

  return authState ? <Outlet /> : <Navigate to="/authorization" />;
};


export default ProtectedRoutes;