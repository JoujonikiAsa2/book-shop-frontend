import { ReactNode } from "react";
export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TSidebarItem =
  | {
      title: string;
      url: ReactNode;
      icon?:string,
      children?: TSidebarItem[];
    }
  | undefined;

export type TUserPath = {
  name?: string;
  icon?:string,
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};
