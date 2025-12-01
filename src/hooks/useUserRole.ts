/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useUserRole.ts
export const extractUserRoleAndEmail = (queryResult: any) => {
  // queryResult is the RTK Query returned `data` (which is the response body)
  // backend wrapper: { statusCode, success, message, data: { accessToken, refreshToken, user } }
  const wrapper = queryResult ?? null;
  const user =
    wrapper?.data?.user ?? // expected: wrapper.data.user
    wrapper?.data ?? // fallback: wrapper.data directly is user
    wrapper; // fallback: maybe queryResult already user

  return {
    role: user?.role ?? null,
    email: user?.email ?? null,
  };
};
