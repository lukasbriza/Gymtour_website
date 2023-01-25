import React from "react";

export type LayoutProps = {
  children: React.ReactNode;
};

export type routeArrayType = routeType[];
export type routeType = { name: string; path: string; component: React.ReactNode };
