export interface loggedInUserInfo {
  id: string;
  email: string;
  name: string;
  role: string;
  organizationId?: string;
  legalName?: string;
  isLoggedIn: boolean;
}

export interface loggedInUserSuperAdminInfo {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
  mfa?: string;
  secret?: string;
  isLoggedIn: boolean;
}

export default interface LoginFields {
  email: string;
  password: string;
}
