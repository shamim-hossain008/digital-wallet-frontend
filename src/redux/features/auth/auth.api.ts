import { baseApi } from "@/redux/baseApi";
import type {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
} from "@/types";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // register user
    register: builder.mutation<IRegisterResponse, IRegisterRequest>({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["Auth"],
    }),
    // login user
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (userinfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userinfo,
      }),
      invalidatesTags: ["Auth"],
    }),
    // Logout user
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    // get me
    // userInfo:builder.query<IUser,void>({
    //     query:()=>({
    //         url:"/user/me",
    //         method:"GET"
    //     }),
    //     providesTags:["User"]
    // })
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;
