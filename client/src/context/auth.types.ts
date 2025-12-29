export type AuthState = {
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
};

export const initialAuthState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  loading: false,
};
