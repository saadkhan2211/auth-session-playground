import type { AuthState } from "./auth.types";

export type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: string }
  | { type: "LOGOUT" };

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
      return {
        accessToken: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGOUT":
      return { accessToken: null, isAuthenticated: false, loading: false };
    default:
      return state;
  }
};
