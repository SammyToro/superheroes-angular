import { createReducer, on, State, Action } from "@ngrx/store";
import { setError, setToken } from "./auth.actions";

export interface AuthState {
  token: string,
  error: any
}

export const initialState: AuthState = {
  token: "",
  error: null
}

export const authReducer = createReducer(
  initialState,
  on(setToken, (state, {token}) => { return { ...state, token }}),
  on(setError,(state, {error}) => {return {...state,error}})
);
