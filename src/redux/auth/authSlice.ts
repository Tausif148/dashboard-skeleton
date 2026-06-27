import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "../store";

export interface IHospital {
  id: number;
  name: string;
}

export interface IUserState {
  token: string;
  isLoggedIn: boolean;
  // companies: ICompany[];
}

const initialState: IUserState = {
  token: "",
  isLoggedIn: false,
  // companies: [],
};

interface IPayload {
  token?: string;
  isLoggedIn?: boolean;
  // companies?: ICompany[];
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserCredential: (state, action: PayloadAction<IPayload>) => {
      state.token = action.payload.token ?? "";
      state.isLoggedIn = action.payload.isLoggedIn ?? false;
      // state.companies = action.payload.companies ?? [];
    },
    // setCompanies: (state, action: PayloadAction<ICompany[]>) => {
    //   state.companies = action.payload;
    // },
    logout: (state) => {
      state.token = "";
      state.isLoggedIn = false;
      // state.companies = [];
    },
  },
});

export const { setUserCredential, logout } = authSlice.actions;


export const useAuthActionsRedux = () => {
  const dispatch = useAppDispatch();
  return {
    setUserCredential: (payload: IPayload) =>
      dispatch(setUserCredential(payload)),

  };
};
export default authSlice.reducer;
