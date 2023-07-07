import React from "react";

export type LayoutProps = {
  children: React.ReactNode;
};

export type ErrorHandlerProps = {
  children: React.ReactNode;
};

export enum Permissions {
  AUTHORIZED = "AUTHORIZED",
}

export type ProtectedRouteProps = {
  children: React.ReactNode;
  expectedPermission: Permissions;
  redirect?: string;
};
