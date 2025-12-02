import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { clearAuth, setAuth } from "@/redux/features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect, type ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface IProps {
  children: ReactNode;
}

function CommonLayout({ children }: IProps) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const { accessToken } = auth;

  const { data, refetch, isError } = useUserInfoQuery(undefined, {
    skip: !accessToken,
  });

  // on app load: load auth from localStorage and refetch user info
  useEffect(() => {
    const storedAuth = localStorage.getItem("dw_auth");
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      dispatch(setAuth(parsed));
    }
  }, [dispatch]);

  // Start query only when accessToken exists

  useEffect(() => {
    if (accessToken) {
      refetch();
    }
  }, [accessToken, refetch]);

  // handle case where token is invalid/expired

  useEffect(() => {
    if (isError) {
      dispatch(clearAuth());
      localStorage.removeItem("dw_auth");
    }
  }, [isError, dispatch]);

  // Update user info after fetch
  useEffect(() => {
    if (data?.data) {
      // Update Redux
      dispatch(
        setAuth({
          ...auth,
          user: data.data,
        })
      );

      // Update localStorage
      const storedAuth = localStorage.getItem("dw_auth");
      if (storedAuth) {
        const parsed = JSON.parse(storedAuth);
        localStorage.setItem(
          "dw_auth",
          JSON.stringify({
            ...parsed,
            user: data.data,
          })
        );
      }
    }
  }, [data, auth, dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
}

export default CommonLayout;
