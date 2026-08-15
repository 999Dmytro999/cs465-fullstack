export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationDetails extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  token: string;
}

export interface AuthenticatedUser {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}
