export interface LoginModel {
  email: string;
  password: string;
}

export interface RegisModel {
  name: string;
  password: string;
  email: 'string';
}

export interface VerifyModel {
  email: string;
  verificationCode: string;
}

export interface ResetModel {
  email: string;
  newPassword: string;
  reNewPassword: string;
  verificationCode: string;
}

export interface GoogleLogin {
  token: string;
  clientId: string;
}

export enum Role {
  Admin = 'Admin',
  User = 'User',
}
