import { IActionResponse } from "src/interface/global.types";
import client from "./client";
import { AUTHENTICATION_API } from "./endpoint";


export const login = (body: { email: string; password: string }): Promise<IActionResponse> => {
    return client.post(AUTHENTICATION_API.LOGIN, body);
};


export const logout = (): Promise<IActionResponse> => {
    return client.post(AUTHENTICATION_API.LOG_OUT);
};

