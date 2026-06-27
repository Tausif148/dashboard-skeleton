import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";

export interface IUseDecoded {
  company_id: number;
  company_name: string;
  userId: number;
  accessToken?: string;
  decoded?: any;
}

const useDecoded = (): IUseDecoded => {
  const userJson =
    typeof window !== "undefined"
      ? localStorage.getItem("user")
      : null;

  const {
    company_id,
    company_name,
    accessToken,
    decoded,
    userId,
  } = useMemo(() => {
    let parsed: any = null;

    try {
      parsed = userJson ? JSON.parse(userJson) : null;
    } catch (e) {
      parsed = null;
    }

    const access = parsed?.access_token || parsed?.token || "";

    let dec = null;

    try {
      dec = access ? jwtDecode(access) : null;
    } catch (e) {
      dec = null;
    }

    return {
      company_id:
        parsed?.company?.company_id ??
        parsed?.company_id ??
        parsed?.branch?.company_id ??
        0,

      company_name:
        parsed?.company?.company_name ??
        parsed?.company_name ??
        "",

      plantId:
        parsed?.company?.plan?.plan_id ??
        parsed?.plan_id ??
        parsed?.branch?.plantId ??
        0,

      accessToken: access,

      decoded: dec,

      userId:
        parsed?.user_id ??
        parsed?.employee_id ??
        parsed?.id ??
        0,
    };
  }, [userJson]);

  return {
    company_id,
    company_name,
    accessToken,
    decoded,
    userId,
  };
};

export default useDecoded;