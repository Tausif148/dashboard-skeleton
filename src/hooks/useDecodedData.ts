/**
 * @format
 */
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { IUserState } from "src/redux/auth/authSlice";
import { RootState } from "../redux/store";

export interface IDecodedData {
  role: string;
  sub: string
  iat: number;
  exp: number;
}

function useDecodedData(): IDecodedData {
  const userInfo: IUserState = useSelector((state: RootState) => state.auth);
  const { token } = userInfo;
  const decoded = token ? jwtDecode(token) : {};

  return {
    ...decoded,
  } as IDecodedData;
}

export default useDecodedData;
