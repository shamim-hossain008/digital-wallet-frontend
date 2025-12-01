import { baseApi } from "@/redux/baseApi";
import type {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  IResponse,
  IUserInfoData,
} from "@/types";

export const authApi = baseApi.injectEndpoints({
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
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["Auth"],
    }),

    // Logout user

    logout: builder.mutation<
      IResponse<{ message: string }>,
      { refreshToken?: string } | void
    >({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),

    // get current user info
    userInfo: builder.query<IResponse<IUserInfoData>, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useUserInfoQuery,
} = authApi;
