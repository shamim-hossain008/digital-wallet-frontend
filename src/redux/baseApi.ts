// import {
//   createApi,
//   fetchBaseQuery,
//   type BaseQueryApi,
//   type BaseQueryFn,
//   type FetchArgs,
// } from "@reduxjs/toolkit/query/react";

// import type { RootState } from "./store";

// import { logout, setUser } from "./features/auth/auth.slice";

// // export const baseApi = createApi({
// //   reducerPath: "baseApi",
// //   // baseQuery: axiosBaseQuery(),
// //   baseQuery: fetchBaseQuery({
// //     baseUrl: "http://localhost:5050/api/v1/",
// //     credentials: "include",
// //     prepareHeaders: (headers, { getState }) => {z
// //     const token = (getState()as RootState).auth.token;

// //     if (token) {
// //       headers.set("authorization", `${token}`);
// //     }

// //     return headers;
// //   },
// //   }),

// //   // tagTypes: ["Auth", "User", "Wallet", "Transaction", "Agent", "Admin"],

// //   endpoints: () => ({}),
// // });

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:4000/api/v1/",
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).auth.token;

//     if (token) {
//       headers.set("authorization", `${token}`);
//     }

//     return headers;
//   },
// });

// const baseQueryWithRefreshToken: BaseQueryFn<
//   FetchArgs,
//   BaseQueryApi

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// > = async (args, api, extraOptions): Promise<any> => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 401) {
//     //* Send Refresh
//     console.log("Sending refresh token");

//     const res = await fetch("http://localhost:4000/api/v1", {
//       method: "POST",
//       credentials: "include",
//     });

//     const data = await res.json();

//     if (data?.data?.accessToken) {
//       const user = (api.getState() as RootState).auth.user;

//       api.dispatch(
//         setUser({
//           user,
//           token: data.data.accessToken,
//         })
//       );

//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logout());
//       console.log("error");
//     }
//   }

//   return result;
// };

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: baseQueryWithRefreshToken,

//   tagTypes: ["Auth", "User", "Wallet", "Transaction", "Agent", "Admin"],

//   endpoints: () => ({}),
// });

import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),

  tagTypes: ["Auth", "User", "Wallet", "Transaction", "Agent", "Admin"],
  endpoints: () => ({}),
});
