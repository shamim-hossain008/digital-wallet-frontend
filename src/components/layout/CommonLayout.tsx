import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { clearAuth, setAuth } from "@/redux/features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect, type ReactNode } from "react";
import { GlobalSkeleton } from "../loading/GlobalSkeleton";
import { NavbarSkeleton } from "../loading/NavbarSkeleton";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface IProps {
  children: ReactNode;
}

function CommonLayout({ children }: IProps) {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);

  const { data, isLoading, isFetching, refetch, isError } = useUserInfoQuery(
    undefined,
    {
      skip: !accessToken,
    }
  );

  // on app load
  useEffect(() => {
    const storedAuth = localStorage.getItem("dw_auth");
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      dispatch(setAuth(parsed));
    }
  }, [dispatch]);

  // Fetch user info when token change
  useEffect(() => {
    if (accessToken) {
      refetch();
    }
  }, [accessToken, refetch]);

  // Token invalid or expired
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
          accessToken,
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
  }, [data, accessToken, dispatch]);

  if ((isLoading || isFetching) && accessToken) {
    return (
      <div className="min-h-screen flex flex-col">
        {/*  */}
        <NavbarSkeleton />
        <div className="grow">
          <GlobalSkeleton />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
}

export default CommonLayout;
