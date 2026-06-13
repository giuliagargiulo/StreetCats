export interface User {
  uu_id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  access_token: string;
  token_type?: string;
}
