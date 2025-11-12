export interface ISendOtp {
  email: string;
}
export interface IVerifyOtp {
  email: string;
  otp: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}
