export interface ApiContext {
  params: Record<string, string>;
  user?: any;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
}
