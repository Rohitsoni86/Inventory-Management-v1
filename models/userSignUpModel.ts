interface CompanyDetails {
  legalName: string;
  registrationNumber: string;
  email: string;
  countryCode: string;
  phone: string;
  address?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  companySize: string;
  flagCode: string;
}

export default interface SignUpFields extends CompanyDetails {
  adminFirstName: string;
  adminLastName?: string;
  adminEmail: string;
  adminCountryCode: string;
  adminPhone: string;
  adminPassword: string;
  adminFlagCode: string;
}
