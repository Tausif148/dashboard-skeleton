
export interface IPaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  from_date?: string;
  to_date?: string;
  society_id?: string | number;
  warehouse_id?: string | number;
  dhan_purchase_center_name?: string;
  isUnauthrize?: boolean;
  billing_id?: string;
    final_status?: string;
  month?: string;
  year?: string;
  segment_id?: string | number;
  vendor_id?: string | number;
}


export interface IStateParams {
  countryId: string;
  isUnauthrize?: boolean;
}

export interface ICityParams {
  stateId: string;
  isUnauthrize?: boolean;
}

import { ChangeEvent } from 'react';

export interface IResponse<T> {
  statusCode: number;
  data: T;
  isSuccessful?: boolean;
  message: string;
  totalCount: number;
  totalDocs?: number;
}

export interface IActionResponse {
  statusCode: number;
  data?: any;
  message: string;
  totalCount?: number;
  isSuccessful?: boolean;
}

export interface IPublicResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  config: Config;
  request: Request;
}

export interface Headers {
  'content-type': string;
}

export interface Config {
  transitional: Transitional;
  adapter: string[];
  transformRequest: any[];
  transformResponse: any[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: any;
  headers: Headers2;
  method: string;
  url: string;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface Headers2 {
  Accept: string;
}

export interface IOption {
  value?: string;
  id?: string | number;
}

export type IChangeEvent = ChangeEvent<HTMLInputElement>;

export interface IDatetimeFormat {
  utcDate: string | number;
  hasDateOnly?: boolean;
  hasDatetime?: boolean;
}

export type IFilterValues<T> = {
  type: T;
  value: string | number;
};
export interface IFilter<T> {
  url: string;
  values: IFilterValues<T>[];
}

export interface IState {
  id: number;
  name: string;
}

export interface IMentionTrigger {
  trigger: '@';
  searchText: string;
  cursorPosition: number;
}

export interface IEditorMentionOption {
  text: string;
  value: string;
  url: string; // userId
}