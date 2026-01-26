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

    // update user profile(accepts FormsData)
    updateUserProfile: builder.mutation<IResponse<IUserInfoData>, FormData>({
      query: (formData) => ({
        url: "/user/update-profile",
        method: "PATCH",
        data: formData,
      }),
      invalidatesTags: ["User"],
    }),
    // Remove user picture
    removeUserPicture: builder.mutation<IResponse<IUserInfoData>, void>({
      query: () => ({
        url: "/user/profile/remove-picture",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // updated User Avatar
    updateUserAvatar: builder.mutation<IResponse<IUserInfoData>, FormData>({
      query: (formdata) => ({
        url: "/user/profile/update-picture",
        method: "PATCH",
        data: formdata,
      }),
      invalidatesTags: ["User"],
    }),

    // change Password
    updatedUserPassword: builder.mutation<
      IResponse<{ message: string }>,
      { oldPassword: string; newPassword: string }
    >({
      query: (payload) => ({
        url: "/user/update-password",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useUserInfoQuery,
  useUpdateUserProfileMutation,
  useUpdateUserAvatarMutation,
  useRemoveUserPictureMutation,
  useUpdatedUserPasswordMutation,
} = authApi;
