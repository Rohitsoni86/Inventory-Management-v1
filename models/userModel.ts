export interface loggedInUserInfo {
  id: string;
  email: string;
  name: string;
  role: string;
  organizationId: string;
  legalName: string;
  isLoggedIn: boolean;
}
export default interface LoginFields {
  email: string;
  password: string;
}
